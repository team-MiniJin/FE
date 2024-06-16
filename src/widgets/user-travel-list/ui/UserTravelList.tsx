import UserTravelFilterAndSort from './UserTravelFilterAndSort';
import UserTravels from './UserTravels';

export default function UserPlanList() {
  return (
    <div>
      <div>
        <UserTravelFilterAndSort />
      </div>
      <div>
        <UserTravels />
      </div>
    </div>
  );
}
