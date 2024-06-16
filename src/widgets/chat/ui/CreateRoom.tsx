import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CreateRoomProps {
  newRoomTitle: string;
  setNewRoomTitle: (title: string) => void;
  createRoom: () => void;
  setShowModal: (show: boolean) => void;
}

export default function CreateRoom({
  newRoomTitle,
  setNewRoomTitle,
  createRoom,
  setShowModal,
}: CreateRoomProps) {
  return (
    <div className="fixed left-0 top-0 z-[99] flex h-full w-full items-center justify-center bg-gray-500 bg-opacity-50">
      <div className="w-80 rounded bg-white p-4 shadow-lg">
        <h2 className="mb-4 text-lg font-semibold">새 채팅방 생성</h2>
        <Input
          className="mb-4 w-full max-w-xs border p-2"
          value={newRoomTitle}
          onChange={(e) => setNewRoomTitle(e.target.value)}
          placeholder="채팅방 이름을 입력해주세요"
        />
        <div className="flex justify-end">
          <Button
            onClick={createRoom}
            className="bg-[--brand-main-color] hover:bg-[--brand-main-color] hover:opacity-50"
          >
            생성
          </Button>
          <Button variant="outline" onClick={() => setShowModal(false)}>
            취소
          </Button>
        </div>
      </div>
    </div>
  );
}
