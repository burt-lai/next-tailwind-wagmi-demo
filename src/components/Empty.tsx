import { ReactNode } from 'react'
import Image from 'next/image'

type TEmptyProps = {
  title?: string
  description?: string
  extra?: ReactNode
}
const Empty = (props: TEmptyProps) => {
  const { title, description, extra } = props
  return (
    <div className='flex flex-col items-center justify-center min-h-full py-24 mx-auto'>
      <Image
        src='/assets/images/empty.png'
        alt='empty'
        width={32}
        height={32}
      />
      {title && (
        <div className='mt-4 text-2xl font-semibold text-white'>{title}</div>
      )}
      <div className={`${title ? 'mt-2' : 'mt-4'} text-gray-spx4`}>
        {description || 'No data'}
      </div>
      {extra && <div className='mt-8'>{extra}</div>}
    </div>
  )
}
export default Empty
