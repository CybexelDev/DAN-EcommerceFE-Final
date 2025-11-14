import { Boxes, ListTree, MessagesSquare, Users } from 'lucide-react';
import DashboardStats from '../../components/tabs/DashboardStats';

export default function BoardSection({totalItems}) {
  return (
    <>
      <div className="w-full h-auto flex gap-9">
        <DashboardStats
          title={"Total products"}
          icon={<Boxes className="w-6 h-6" />}
          rate={totalItems?.products}
        />
        <DashboardStats
          title={"Total categories"}
          icon={<ListTree className="w-6 h-6" />}
          rate={totalItems?.categories}
        />
        <DashboardStats
          title={"Total enquiries"}
          icon={<MessagesSquare className="w-6 h-6" />}
          rate={totalItems?.enquiries}
        />
        <DashboardStats
          title={"Total users"}
          icon={<Users className="w-6 h-6" />}
          rate={totalItems?.users}
        />
      </div>
    </>
  );
}