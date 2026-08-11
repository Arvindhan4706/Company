import { db } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Phone, Mail, FileText, Calendar, User, Clock, MessageSquare, Plus, CheckCircle, Send, XCircle } from 'lucide-react';
import { revalidatePath } from 'next/cache';

export const metadata = {
  title: 'Inquiry Detail | Admin',
};

// Server Actions
async function updateStatus(formData) {
  'use server';
  const id = formData.get('id');
  const status = formData.get('status');
  const priority = formData.get('priority');
  
  await db.inquiry.update({
    where: { id },
    data: { status, priority }
  });
  
  await db.activityLog.create({
    data: {
      action: 'STATUS_UPDATED',
      entity: 'INQUIRY',
      entityId: id,
      details: `Status updated to ${status}, Priority to ${priority}`
    }
  });
  
  revalidatePath(`/admin/inquiries/${id}`);
}

async function addNote(formData) {
  'use server';
  const session = await getServerSession(authOptions);
  const id = formData.get('id');
  const note = formData.get('note');
  
  if (!note.trim()) return;

  const author = await db.user.findUnique({ where: { email: session.user.email } });

  await db.inquiryNote.create({
    data: {
      note,
      inquiryId: id,
      authorId: author.id
    }
  });

  await db.activityLog.create({
    data: {
      action: 'NOTE_ADDED',
      entity: 'INQUIRY',
      entityId: id,
      userId: author.id,
      details: 'Added an internal note.'
    }
  });

  revalidatePath(`/admin/inquiries/${id}`);
}

async function addFollowUp(formData) {
  'use server';
  const session = await getServerSession(authOptions);
  const id = formData.get('id');
  const date = formData.get('date');
  const time = formData.get('time');
  const note = formData.get('note');

  if (!date || !note.trim()) return;
  const author = await db.user.findUnique({ where: { email: session.user.email } });

  await db.followUp.create({
    data: {
      date: new Date(date),
      time: time || null,
      note,
      inquiryId: id,
      userId: author.id
    }
  });

  await db.inquiry.update({
    where: { id },
    data: { lastContactedAt: new Date() }
  });

  await db.activityLog.create({
    data: {
      action: 'FOLLOW_UP_CREATED',
      entity: 'INQUIRY',
      entityId: id,
      userId: author.id,
      details: `Scheduled follow-up for ${date}`
    }
  });

  revalidatePath(`/admin/inquiries/${id}`);
}

export default async function InquiryDetailPage({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const inquiry = await db.inquiry.findUnique({
    where: { id: params.id },
    include: {
      assignedTo: true,
      notes: { include: { author: true }, orderBy: { createdAt: 'desc' } },
      followUps: { include: { user: true }, orderBy: { date: 'asc' } },
      quotations: { orderBy: { createdAt: 'desc' } }
    }
  });

  if (!inquiry) notFound();

  const activityLogs = await db.activityLog.findMany({
    where: { entity: 'INQUIRY', entityId: inquiry.id },
    orderBy: { createdAt: 'desc' },
    include: { user: true }
  });

  const duplicates = await db.inquiry.findMany({
    where: {
      id: { not: inquiry.id },
      OR: [
        { email: inquiry.email },
        ...(inquiry.phone ? [{ phone: inquiry.phone }] : [])
      ]
    },
    select: { id: true, referenceNumber: true, status: true, createdAt: true }
  });

  const tags = inquiry.tags ? JSON.parse(inquiry.tags) : [];

  return (
    <div className="pb-12">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/inquiries" className="p-2 border border-gray-200 rounded-md text-gray-500 hover:bg-gray-50 transition-colors">
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
              {inquiry.referenceNumber}
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-md border border-gray-200 uppercase tracking-wider">{inquiry.status}</span>
              {tags.map((tag, i) => (
                <span key={i} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-md border border-blue-200 uppercase tracking-wider">{tag}</span>
              ))}
            </h1>
            <p className="text-gray-500 text-sm mt-1">Submitted on {new Date(inquiry.createdAt).toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Core Info */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Customer & Service Info Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2"><User size={18} className="text-blue-500"/> Customer Information</h2>
              {duplicates.length > 0 && (
                <span className="text-xs bg-amber-100 text-amber-800 border border-amber-200 px-2 py-1 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> {duplicates.length} duplicate(s) found
                </span>
              )}
            </div>
            <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Name</p>
                <p className="text-sm font-semibold text-gray-900">{inquiry.name}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Company</p>
                <p className="text-sm font-semibold text-gray-900">{inquiry.company || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Email</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-900">{inquiry.email}</p>
                  <a href={`mailto:${inquiry.email}`} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-1.5 rounded"><Mail size={14}/></a>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Phone</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm text-gray-900">{inquiry.phone || '—'}</p>
                  {inquiry.phone && <a href={`tel:${inquiry.phone}`} className="text-green-600 hover:text-green-800 bg-green-50 p-1.5 rounded"><Phone size={14}/></a>}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Location</p>
                <p className="text-sm text-gray-900">{inquiry.location || '—'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Preferred Contact</p>
                <p className="text-sm text-gray-900 font-medium">{inquiry.preferredContactMethod || 'Email'}</p>
              </div>
            </div>
          </div>

          {/* Service Requirement Card */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2"><FileText size={18} className="text-blue-500"/> Service Requirement</h2>
            </div>
            <div className="p-5">
              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Requested Service</p>
                  <p className="text-sm font-semibold text-blue-700 bg-blue-50 inline-block px-2 py-1 rounded border border-blue-100">{inquiry.service || 'General Inquiry'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Expected Timeline</p>
                  <p className="text-sm text-gray-900">{inquiry.timeline || '—'}</p>
                </div>
              </div>
              
              <div className="mb-6">
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Requirement Description</p>
                <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-sm text-gray-700 whitespace-pre-wrap font-mono">
                  {inquiry.message}
                </div>
              </div>

              {inquiry.documentUrl && (
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase tracking-wider mb-2">Attached Document</p>
                  <a href={inquiry.documentUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-800 bg-blue-50 px-4 py-2 rounded-md border border-blue-100 transition-colors">
                    <FileText size={16} /> View Document
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Follow-ups Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2"><Calendar size={18} className="text-blue-500"/> Follow-ups</h2>
            </div>
            <div className="p-5">
              {inquiry.followUps.length > 0 ? (
                <div className="space-y-3 mb-6">
                  {inquiry.followUps.map(fu => (
                    <div key={fu.id} className="border border-gray-100 rounded-md p-3 flex justify-between items-start bg-white shadow-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded ${fu.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{fu.status}</span>
                          <span className="text-xs font-semibold text-gray-800">{new Date(fu.date).toLocaleDateString()} {fu.time && `at ${fu.time}`}</span>
                        </div>
                        <p className="text-sm text-gray-600">{fu.note}</p>
                      </div>
                      <div className="text-[10px] text-gray-400">By {fu.user?.name || 'Admin'}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 mb-6 italic">No follow-ups scheduled yet.</p>
              )}

              <form action={addFollowUp} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <input type="hidden" name="id" value={inquiry.id} />
                <p className="text-xs font-semibold text-gray-700 mb-3 uppercase tracking-wider">Schedule New Follow-up</p>
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <input type="date" name="date" required className="border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                  <input type="time" name="time" className="border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none" />
                </div>
                <input type="text" name="note" required placeholder="Follow-up notes or action required..." className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none mb-3" />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-700 transition-colors w-full">Schedule Follow-up</button>
              </form>
            </div>
          </div>

        </div>

        {/* Right Column - Status & Internal Tools */}
        <div className="space-y-6">
          
          {/* Quotations Panel */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
              <h2 className="font-semibold text-gray-800 text-sm flex items-center gap-2"><FileText size={16} className="text-indigo-600"/> Quotations</h2>
            </div>
            <div className="p-4 space-y-3">
              {inquiry.quotations && inquiry.quotations.length > 0 ? (
                inquiry.quotations.map(quote => (
                  <Link key={quote.id} href={`/admin/quotations/${quote.id}`} className="block border border-gray-200 rounded-md p-3 hover:bg-gray-50 transition-colors group">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm text-indigo-600 group-hover:text-indigo-800">{quote.quotationNumber}</span>
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${quote.status === 'ACCEPTED' ? 'bg-green-100 text-green-800' : quote.status === 'REJECTED' ? 'bg-red-100 text-red-800' : quote.status === 'SENT' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}>
                        {quote.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>{new Date(quote.createdAt).toLocaleDateString()}</span>
                      <span className="font-semibold text-gray-900">₹ {quote.grandTotal.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-xs text-gray-400 italic text-center py-2">No quotations created yet.</p>
              )}
              <Link href={`/admin/inquiries/${inquiry.id}/quote`} className="flex items-center justify-center gap-2 w-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded text-sm font-medium transition-colors mt-2">
                <Plus size={16}/> Create Quotation
              </Link>
            </div>
          </div>

          {/* Status & Assignment */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-800 text-sm">Status & Pipeline</h2>
            </div>
            <div className="p-4">
              <form action={updateStatus} className="space-y-4">
                <input type="hidden" name="id" value={inquiry.id} />
                
                <div>
                  <label className="block text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Pipeline Stage</label>
                  <select name="status" defaultValue={inquiry.status} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none bg-white font-medium">
                    <option value="NEW">New</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="REQUIREMENT_VERIFIED">Req. Verified</option>
                    <option value="QUOTATION">Quotation</option>
                    <option value="NEGOTIATION">Negotiation</option>
                    <option value="WON">Won</option>
                    <option value="LOST">Lost</option>
                    <option value="CLOSED">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 font-medium uppercase tracking-wider mb-1">Priority</label>
                  <select name="priority" defaultValue={inquiry.priority} className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:border-blue-500 focus:outline-none bg-white font-medium">
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>

                <button type="submit" className="w-full bg-gray-900 text-white px-4 py-2 rounded text-sm font-medium hover:bg-black transition-colors">Update Status</button>
              </form>
            </div>
          </div>

          {/* Internal Notes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col" style={{maxHeight: '400px'}}>
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-800 text-sm flex items-center gap-2"><MessageSquare size={16}/> Internal Notes</h2>
            </div>
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/30">
              {inquiry.notes.length > 0 ? inquiry.notes.map(note => (
                <div key={note.id} className="bg-white border border-gray-200 p-3 rounded-md shadow-sm">
                  <p className="text-sm text-gray-800 mb-2">{note.note}</p>
                  <div className="flex justify-between items-center text-[10px] text-gray-400">
                    <span>{note.author?.name || 'Admin'}</span>
                    <span>{new Date(note.createdAt).toLocaleString()}</span>
                  </div>
                </div>
              )) : (
                <p className="text-xs text-gray-400 text-center italic py-4">No internal notes yet.</p>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 bg-white">
              <form action={addNote}>
                <input type="hidden" name="id" value={inquiry.id} />
                <textarea name="note" rows="2" placeholder="Type a private note..." className="w-full border border-gray-300 rounded p-2 text-sm focus:border-blue-500 focus:outline-none mb-2 resize-none"></textarea>
                <button type="submit" className="w-full bg-blue-50 text-blue-600 border border-blue-100 px-4 py-2 rounded text-xs font-bold uppercase tracking-wider hover:bg-blue-100 transition-colors">Add Note</button>
              </form>
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-800 text-sm flex items-center gap-2"><Clock size={16}/> Activity Timeline</h2>
            </div>
            <div className="p-4 space-y-4 max-h-[300px] overflow-y-auto">
              {activityLogs.map((log, index) => (
                <div key={log.id} className="relative pl-4 border-l-2 border-gray-200">
                  <div className="absolute w-2 h-2 bg-gray-400 rounded-full -left-[5px] top-1.5 border-2 border-white"></div>
                  <p className="text-xs font-semibold text-gray-800">{log.action.replace('_', ' ')}</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">{log.details}</p>
                  <p className="text-[10px] text-gray-400 mt-1">{new Date(log.createdAt).toLocaleString()} {log.user && `by ${log.user.name}`}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
