import BaseLayout from '@/layouts/BaseLayout'
import { CreatePool } from '@/components/CreatePool'

const Create = () => {
  return (
    <BaseLayout pageTitle='Create Pool' pageDesc='Create a Fund Pool'>
      <CreatePool />
    </BaseLayout>
  )
}

export default Create
