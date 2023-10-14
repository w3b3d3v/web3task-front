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
      <Box display="inline-flex" alignItems="center">
        <img src="/static/images/task/home/filtroIcon.svg" alt="Filtro" />

        <Typography fontSize={20}>Filtro</Typography>
      </Box>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreTwoToneIcon
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
              }}
            />
          }
        >
          <Typography>Título</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            label="Pesquisar por título"
            variant="standard"
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreTwoToneIcon
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
              }}
            />
          }
        >
          <Typography>Criador</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <TextField
            value={creatorRole}
            onChange={(e) => setCreatorRole(e.target.value)}
            label="Pesquisar por criador"
            variant="standard"
            fullWidth
          />
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreTwoToneIcon
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
              }}
            />
          }
        >
          <Typography>Pagamento por hora</Typography>
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
              {maxReward}
            </Typography>
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreTwoToneIcon
              sx={{
                color: theme.palette.mode === 'dark' ? 'white' : 'black',
              }}
            />
          }
        >
          <Typography>Data de vencimento</Typography>
        </AccordionSummary>

        <AccordionDetails>
          <DatePicker
            label="Data de vencimento"
            value={dueDate}
            onChange={setDueDate}
            format="DD/MM/YYYY"
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export default SearchFilters;
