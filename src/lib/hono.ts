import { appType } from '@/app/api/[[...route]]/route';
import { hc } from "hono/client";

export const client = hc<appType>(process.env.NEXT_PUBLIC_APP_URL!);