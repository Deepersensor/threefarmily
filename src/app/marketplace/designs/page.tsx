import { redirect } from 'next/navigation';

export default function DesignsRedirect() {
  redirect('/designs');
  return null;
}
