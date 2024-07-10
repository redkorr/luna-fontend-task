import { HistoryMode } from '@/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

interface HostiryModeSelectProps {
  historyMode: HistoryMode;
  setHistoryMode: (arg: HistoryMode) => void;
}

const HistoryModeSelect = ({
  historyMode,
  setHistoryMode,
}: HostiryModeSelectProps) => {
  return (
    <Select
      defaultValue={historyMode}
      onValueChange={(e: HistoryMode) => setHistoryMode(e)}
    >
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Daily' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value='hourly'>Hourly</SelectItem>
          <SelectItem value='daily'>Daily</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default HistoryModeSelect;
