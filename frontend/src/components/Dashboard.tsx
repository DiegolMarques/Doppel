'use client'
import UploadButton from "./UploadButton";
import { Ghost, Loader2, MessageSquare, Plus, Trash } from "lucide-react";
import Skeleton from 'react-loading-skeleton';
import Link from "next/link";
import { format } from 'date-fns';
import { Button } from "./ui/button";
import { useState, useEffect, SetStateAction } from "react";
import axios from 'axios';

const Dashboard = () => {
  const [currentlyDeleting, setCurrentlyDeleting] = useState<string | null>(null);
  const [conversations, setConversations] = useState<{ id: string; name: string; createdAt: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const prodlink = "https://doppel-backend.vercel.app"

  useEffect(() => {
    fetchConversations();
  }, []);

  const fetchConversations = async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_API_URL + '/conversations/conversation');
      setConversations(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching conversations:', error);
      setIsLoading(false);
    }
  };

  const deleteConversation = async (id: string) => {
    setCurrentlyDeleting(id);
    try {
      await axios.delete(process.env.NEXT_PUBLIC_API_URL + `/conversations/conversation/${id}`);
      fetchConversations();
    } catch (error) {
      console.error('Error deleting conversation:', error);
    } finally {
      setCurrentlyDeleting(null);
    }
  };


  return (
    <main className='mx-auto max-w-7xl md:p-10'>
      <div className='mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center sm:gap-0'>
        <h1 className='mb-3 font-bold text-5xl text-gray-900'>
          My Conversations
        </h1>
        <UploadButton />
      </div>

      {/* display all conversations */}
      {conversations && conversations.length !== 0 ? (
        <ul className="mt-8 grid grid-cols-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
          {conversations.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          ).map((conversation => (
            <li key={conversation.id} className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg'>
              <Link href={`/dashboard/${conversation.id}`} className='flex flex-col gap-2'>
                <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
                  <div className="h-10 w-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <div className='flex-1 truncate'>
                    <div className="flex items-center space-x-3">
                      <h3 className="truncate text-lg font-medium text-zinc-900">{conversation.name}</h3>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
                <div className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  {format(new Date(conversation.createdAt), 'MMM yyyy')}
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  mocked
                </div>

                <Button onClick={() => deleteConversation(conversation.id)} size='sm' className="w-full" variant='destructive'>
                  {currentlyDeleting === conversation.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) :
                    <Trash className="h-4 w-4" />}
                </Button>
              </div>
            </li>
          )))}
        </ul>
      ) : isLoading ? (
        <Skeleton count={3} height={100} className='my-2' />
      ) : (
        <div className='mt-16 flex flex-col items-center gap-2'>
          <Ghost className='h-8 w-8 text-zinc-800' />
          <h3 className='font-semibold text-xl'>
            Pretty empty here...
          </h3>
          <p>Let&apos;s upload your first conversation.</p>
        </div>
      )}
    </main>
  )
}

export default Dashboard;