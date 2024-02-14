import { DatePicker } from '@mui/x-date-pickers';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Slider,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';
import { useSearchFilters } from 'src/hooks/useSearchFilters';
import TuneIcon from '@mui/icons-material/Tune';
import { ethers } from 'ethers';

interface SearchFiltersProps {
  maxReward?: number;
}

function SearchFilters({ maxReward = 0 }: SearchFiltersProps) {
  const {
    title,
    setTitle,
    creatorRole,
    setCreatorRole,
    reward,
    setReward,
    dueDate,
    setDueDate,
  } = useSearchFilters();
  const theme = useTheme();

  return (
    <Box display="flex" flexDirection="column">
      <Box display="inline-flex" alignItems="left" justifyContent={'left'} gap={1} ml={2}>
        <TuneIcon color='primary' />
        <Typography fontSize={20}>Filter</Typography>
      </Box>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreTwoToneIcon
              color='primary'
            />
          }
        >
          <Typography>Title</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Search for title"
            variant="standard"
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreTwoToneIcon
              color='primary'
            />
          }
        >
          <Typography>Creator</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <TextField
            value={creatorRole}
            onChange={(e) => setCreatorRole(e.target.value)}
            label="Search for creator"
            variant="standard"
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreTwoToneIcon
              color='primary'
            />
          }
        >
          <Typography>Payment</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography>
              0
            </Typography>

            <Slider
              valueLabelDisplay="auto"
              value={reward}
              onChange={(_, value) => setReward(value as number)}
              min={0}
              max={maxReward}
            />

            <Typography>
              {ethers.utils.formatEther(maxReward.toString())}
            </Typography>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreTwoToneIcon
              color='primary' />
          }
        >
          <Typography>End date</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <DatePicker
            label="End date"
            value={dueDate}
            onChange={setDueDate}
            format="MM/DD/YYYY"
            slotProps={{
              textField: { size: 'medium' },
              openPickerIcon: { style: { color: theme.palette.primary.main } },
              switchViewButton: { style: { color: 'info' } }
            }}
          />
        </AccordionDetails>
      </Accordion>

    </Box >
  );
}

export default SearchFilters;
