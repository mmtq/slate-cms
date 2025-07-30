// 'use client';

// import { Bell } from "lucide-react";
// import { Button } from "../ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

// interface Props {

// }

// const Notification = ({ }: Props) => {
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger asChild> 
//                 <Button size={"sm"} variant={'secondary'} className="relative">
//                     <Bell />
//                     <div className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs">
//                         1
//                     </div>
//                 </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem>Profile</DropdownMenuItem>
//                 <DropdownMenuItem>Billing</DropdownMenuItem>
//                 <DropdownMenuItem>Team</DropdownMenuItem>
//                 <DropdownMenuItem>Subscription</DropdownMenuItem>
//             </DropdownMenuContent>
//         </DropdownMenu>
//     );
// };

// export default Notification;

'use client'

import { useSocketNotifications } from '@/hooks/useSocketNotification'

export default function NotificationIcon({ userId }: { userId?: string }) {
  const { unreadCount, clearNotifications } = useSocketNotifications(userId)

  return (
    <button onClick={clearNotifications} className="relative">
      🔔
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  )
}
