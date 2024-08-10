import { Suspense } from 'react'

import CustomBreadcrumb from '@/components/shared/CustomBreadcrumb'
import { adminPageBread } from '@/constant/breadcrumpItems'
import PageHeading from '@/components/shared/PageHeading'
import LoaderBar from '@/components/shared/LoaderBar'
import AdminProfile from './ui/AdminProfile'

export default function AdminDetailsPage({id}) {
    
  return (
    <>
    <PageHeading title="Admin Page" />
    <CustomBreadcrumb items={adminPageBread} />
    <Suspense fallback={<LoaderBar />}>
        <AdminProfile id={id} />
    </Suspense>
    </>
  )
}
