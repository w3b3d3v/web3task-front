import { useContext } from "react"
import { SearchFiltersContext } from "src/contexts/SearchFiltersContext"

export const useSearchFilters = () => {
  const context = useContext(SearchFiltersContext)

  return context
}