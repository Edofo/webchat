import { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFriend } from '@/contexts/FriendContext'
import { useToast } from '@/contexts/ToastContext'

interface DialogAddFriendProps {
  isOpen: boolean
  onClose: () => void
}

const DialogAddFriend = ({ isOpen, onClose }: Readonly<DialogAddFriendProps>) => {
  const [friendPseudo, setFriendPseudo] = useState('')
  const { addFriend } = useFriend()
  const { addToast } = useToast()

  const handleSubmit = async () => {
    if (!friendPseudo) return addToast('Pseudo is required', 'error')
    await addFriend(friendPseudo)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a friend</DialogTitle>
          <DialogDescription> Enter the pseudo of the friend you want to add.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pseudo">Pseudo</Label>
            <Input id="pseudo" type="text" onChange={e => setFriendPseudo(e.currentTarget.value)} />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Invite</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default DialogAddFriend
