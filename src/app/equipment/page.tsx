import { redirect } from 'next/navigation';

export default function EquipmentRedirect() {
  redirect('/marketplace/equipment');
  return null;
}
