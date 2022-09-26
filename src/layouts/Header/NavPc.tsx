import Link from 'next/link'
import { useRouter } from 'next/router'
import { FiExternalLink } from 'react-icons/fi'
import { navConfig } from './nav.config'

const NavPc = () => {
  const router = useRouter()
  console.log('router:', router)
  return (
    <div className='justify-center hidden ml-14 lg:flex'>
      <ul className='flex items-center space-x-8 text-gray-spx4'>
        {navConfig.map(({ name, href }) => (
          <li
            key={name}
            className={router.pathname === href ? 'text-white' : ''}
          >
            <Link href={href}>
              <a className='hover:text-white'>{name}</a>
            </Link>
          </li>
        ))}
        <li>
          <a
            className='flex items-center hover:text-white'
            target='_blank'
            href='http://18.117.169.91:4000/'
            rel='noreferrer'
          >
            Explorer <FiExternalLink className='ml-1' />
          </a>
        </li>
      </ul>
    </div>
  )
}
export default NavPc
