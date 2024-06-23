'use client'

import { useState } from "react"
import { Dialog, DialogContent, DialogTrigger, DialogFooter } from "./ui/dialog"
import { Textarea } from "./ui/textarea"
import { Input } from "./ui/input"
import { ArrowRight } from "lucide-react"
import { Button, buttonVariants } from "./ui/button"
import { useRouter } from 'next/navigation'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const UploadButton = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [name, setName] = useState("")
  const [conversationString, setConversationString] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()

  const handleNext = () => {
    setStep(2)
  }

  const handleClose = () => {
    setIsOpen(false)
    setStep(1)
    setName("")
    setConversationString("")
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await axios.post("http://localhost:8000" + `/conversations/conversation`, { name, conversationString })
      handleClose()
      router.refresh() // Refresh the page to show the new conversation
    } catch (error) {
      console.error('Error creating conversation:', error)
      // Handle error (e.g., show an error message to the user)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(v) => {
      if (!v) {
        handleClose()
      } else {
        setIsOpen(true)
      }
    }}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>
          Upload Conversation <ArrowRight className='ml-2 h-5 w-5' />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900">Instructions</h2>
            <p className="mt-4 text-lg text-gray-600">
              Please enter a name for your conversation and paste your conversation text on the next page.
            </p>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter conversation name"
              className="mt-4"
            />
            <DialogFooter>
              <Button
                onClick={handleNext}
                className={buttonVariants({
                  size: "lg",
                  className: 'mt-5'
                })}
                disabled={!name.trim()}
              >
                Next <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-900">Paste Your Conversation</h2>
            <Textarea
              value={conversationString}
              onChange={(e) => setConversationString(e.target.value)}
              placeholder="Paste your conversation here..."
              className="mt-4 h-[200px]"
            />
            <DialogFooter>
              <Button
                onClick={handleSubmit}
                className={buttonVariants({
                  size: "lg",
                  className: 'mt-5'
                })}
                disabled={isSubmitting || !conversationString.trim()}
              >
                {isSubmitting ? 'Submitting...' : 'Submit and Close'} <ArrowRight className='ml-2 h-5 w-5' />
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton