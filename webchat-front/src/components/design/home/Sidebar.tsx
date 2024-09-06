import { ChevronRight, LogOut, Menu, MessageSquare, UserPlus, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { useAuth } from '@/contexts/AuthContext'
import { useChat } from '@/contexts/ChatContext'
import { useFriend } from '@/contexts/FriendContext'

import DialogAddFriend from '../dialog/AddFriend'

export const Sidebar = () => {
  const { user, logout } = useAuth()
  const { setRoom } = useChat()
  const { friends } = useFriend()

  const friendsOnline = useMemo(() => friends.filter(friend => friend.isOnline), [friends])
  const friendsOffline = useMemo(() => friends.filter(friend => !friend.isOnline), [friends])

  const [isOpen, setIsOpen] = useState(false)
  const [isOpenDialogFriend, setIsOpenDialogFriend] = useState(false)

  const toggleSidebar = () => setIsOpen(!isOpen)

  return (
    <>
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-2 right-2 z-30 p-2 bg-blue-600 bg-opacity-80 backdrop-blur-lg rounded-full text-white"
        aria-label="Toggle sidebar"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside
        className={`
          fixed inset-y-0 left-0 z-20 w-72 bg-white bg-opacity-10 backdrop-blur-lg p-4
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:relative md:translate-x-0
        `}
      >
        <Popover>
          <PopoverTrigger asChild>
            <div className="flex items-center gap-2 mb-6 cursor-pointer  bg-white  bg-opacity-0 hover:bg-opacity-30 transition-colors py-2 rounded">
              <img
                src="https://i.pravatar.cc/300"
                alt="Webchat"
                className="w-14 h-14 rounded-full"
              />
              <div className="flex w-full justify-between items-center ">
                <p className="text-center text-white text-opacity-80 font-bold">{user?.pseudo}</p>
                <ChevronRight className="h-5 w-5 text-white" />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="p-2 bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-md">
            <button
              onClick={logout}
              className="flex items-center gap-2 w-full text-left p-3 rounded-lg  bg-white bg-opacity-0 hover:bg-opacity-30 transition-colors text-whit focus:outline-none text-white "
            >
              <LogOut className="h-5 w-5" />
              Se déconnecter
            </button>
          </PopoverContent>
        </Popover>
        <h2 className="flex justify-between items-center text-2xl font-bold text-white mb-1">
          Friends
          <div
            className="cursor-pointer p-2 bg-white bg-opacity-0 hover:bg-opacity-30 transition-colors rounded"
            onClick={() => setIsOpenDialogFriend(true)}
          >
            <UserPlus className="h-5 w-5 text-white r" />
          </div>
        </h2>
        <div>
          <p className="text-white text-opacity-80 font-bold">{friendsOnline.length} Online</p>
          <ul className="space-y-2 mt-2">
            {friendsOnline.map(friend => (
              <li key={friend.id}>
                <button
                  onClick={() => {
                    setRoom({ id: friend.id, name: friend.pseudo })
                    setIsOpen(false)
                  }}
                  className="w-full text-left p-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white flex items-center space-x-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>{friend.pseudo}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p className="text-white text-opacity-80 font-bold">{friendsOffline.length} Offline</p>
          <ul className="space-y-2 mt-2">
            {friendsOffline.map(friend => (
              <li key={friend.id}>
                <button
                  onClick={() => {
                    setRoom({ id: friend.id, name: friend.pseudo })
                    setIsOpen(false)
                  }}
                  className="w-full text-left p-3 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors text-white flex items-center space-x-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>{friend.pseudo}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
          aria-hidden="true"
        />
      )}

      <DialogAddFriend isOpen={isOpenDialogFriend} onClose={() => setIsOpenDialogFriend(false)} />
    </>
  )
}
