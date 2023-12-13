"use client"

import { TaskFront } from "@/models/task";
import dayjs, { Dayjs } from "dayjs";
import { useState, createContext, useCallback } from "react";

type SearchFiltersContext = {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>
  creatorRole: string;
  setCreatorRole: React.Dispatch<React.SetStateAction<string>>
  reward: number
  setReward: React.Dispatch<React.SetStateAction<number>>
  dueDate: Dayjs | null
  setDueDate: React.Dispatch<React.SetStateAction<Dayjs | null>>
  filter: (tasks: TaskFront[]) => TaskFront[]
};


export const SearchFiltersContext = createContext<SearchFiltersContext>(
  {} as SearchFiltersContext
);

interface ISearchFiltersProvider {
  children: React.ReactNode
}

export const SearchFiltersProvider: React.FC<ISearchFiltersProvider> = ({ children }) => {
  const [title, setTitle] = useState("")
  const [creatorRole, setCreatorRole] = useState("")
  const [reward, setReward] = useState(0)
  const [dueDate, setDueDate] = useState<Dayjs | null>(null)

  const filter = useCallback((tasks: TaskFront[]) => {
    return tasks.filter((task) => {
      if (title && !task.title.toLowerCase().includes(title.toLowerCase())) {
        return false
      }

      if (creatorRole && !task.creatorRole.toLowerCase().includes(creatorRole.toLowerCase())) {
        return false
      }

      if (reward > 0 && (reward >= Number.parseFloat(task.reward))) {
        return false
      }

      if (dueDate && dueDate.startOf('day').isBefore(dayjs.unix(Number(task.endDate)).startOf('day'))) {
        return false
      }

      return true
    })
  }, [title, creatorRole, reward, dueDate])

  return (
    <SearchFiltersContext.Provider
      value={{
        title,
        setTitle,
        creatorRole,
        setCreatorRole,
        reward,
        setReward,
        dueDate,
        setDueDate,
        filter,
      }}
    >
      {children}
    </SearchFiltersContext.Provider>
  );
};
