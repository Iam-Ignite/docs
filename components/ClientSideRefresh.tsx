import { useRouter } from 'next/router'
import useSWR from 'swr'

// This component is never mounted when you're in production mode.
// Only when running in `NODE_ENV==='development'`.
// It will reload the content every time the current page is focussed
// (from being not focussed).
export default function ClientSideRefresh() {
  const router = useRouter()

  useSWR(
    router.asPath,
    () => {
      router.replace(router.asPath)
    },
    {
      // Implied here is that `revalidateOnFocus: true` which the default
      // and it means that the `useSWR` hook will make a listener on the
      // the Page Visibility API.
      // https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
      // It effectly means that the callback of this hook will run every
      // time the browser window is put back to being visible.

      // The `revalidateOnMount` is crucial because it means that we don't
      // bother executing the hook callback when it was first mounted
      // because, naturally, the first time you mount it, it will not
      // need to refresh because it's as fresh as it gets already.
      revalidateOnMount: false,
    }
  )

  return null
}
