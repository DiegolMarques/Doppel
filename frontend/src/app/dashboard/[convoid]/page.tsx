import ChatBox from '@/components/ChatBox'


interface PageProps {
  params: {
    convoid: string
  }
}

const Page = async ({ params }: PageProps) => {
  const { convoid } = params

  return (
    <ChatBox />
  )
}

export default Page