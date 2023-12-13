'use client'

import { useTaskServiceHook } from "@/hooks/TaskServiceHook";
import { useEffect } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import CardMultiTasks from "@/components/03-organisms/CardMultiTasks";
import CoverHomeTasks from "@/components/02-molecules/CoverHomeTasks";
import usePagination from "@/hooks/usePagination";
import SearchFilters from "@/components/03-organisms/SearchFiltersTasks";
import { useSearchFilters } from "@/hooks/useSearchFilters";

const TASKS_PER_PAGE = 20;

const HomeTasks = () => {
  const { handleMultiTask, multiTasksData, loading } =
    useTaskServiceHook();
  const theme = useTheme();
  const { filter: filterTasks } = useSearchFilters();
  const { currentPage, Pagination } = usePagination();

  useEffect(() => {
    const minimumTasks = (currentPage - 1) * TASKS_PER_PAGE + 1;
    const maxTasks = currentPage * TASKS_PER_PAGE;

    const fetchData = async () => {
      try {
        await handleMultiTask(minimumTasks, maxTasks, false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchData();
  }, [currentPage, handleMultiTask]);

  const maxReward =
    multiTasksData?.reduce((acc, curr) => {
      const parsedReward = Number.parseFloat(curr.reward);

      return parsedReward > acc ? parsedReward : acc;
    }, 0) || 0;

  const filteredMultiTasks = filterTasks(multiTasksData);

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <CoverHomeTasks />

        <Box>
          <Box height={40} bgcolor={"#8EFFC2"} />

          <Grid
            container
            spacing={2}
            marginTop={0}
            style={{ width: "100%", overflowX: "hidden" }}
          >
            <Grid
              item
              xs={3}
              bgcolor={
                theme.palette.mode === "dark"
                  ? theme.colors.alpha.black[100]
                  : theme.colors.alpha.trueWhite[100]
              }
            >
              <SearchFilters maxReward={maxReward} />
            </Grid>

            <Grid item xs={9} style={{ maxWidth: "100%" }}>
              <CardMultiTasks
                multiTasksData={filteredMultiTasks}
                loading={loading}
                page={currentPage}
              />
            </Grid>
          </Grid>
        </Box>

        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          mt={10}
        >
          <Pagination />
        </Box>
      </Box>
    </>
  );
};

export default HomeTasks;
