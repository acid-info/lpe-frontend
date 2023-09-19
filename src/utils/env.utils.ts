import { PHASE_PRODUCTION_BUILD } from 'next/dist/shared/lib/constants'

export const isBuildTime = () =>
  process.env.NEXT_PHASE === PHASE_PRODUCTION_BUILD

export const isVercel = () => process.env.VERCEL === '1'
