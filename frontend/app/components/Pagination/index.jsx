import { StyledButtonPage, StyledButtonArrows } from './styles'
import { Wrapper, Icon } from '..'

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const showPages = 5
  let startPage = Math.max(currentPage - Math.floor(showPages / 2), 1)
  let endPage = Math.min(startPage + showPages - 1, totalPages)

  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(endPage - showPages + 1, 1)
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handleFirstPage = () => {
    onPageChange(1)
  }

  const handleLastPage = () => {
    onPageChange(totalPages)
  }

  return (
    <Wrapper flexbox justify="center" gap="g5">
      <StyledButtonArrows onClick={handleFirstPage} bgcolor="white">
        <Icon name="MdKeyboardDoubleArrowLeft" size={15} />
      </StyledButtonArrows>
      <StyledButtonArrows onClick={handlePreviousPage} bgcolor="white">
        <Icon name="MdKeyboardArrowLeft" size={15} />
      </StyledButtonArrows>

      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <StyledButtonPage
          key={startPage + index}
          onClick={() => onPageChange(startPage + index)}
          corner="form"
          color={currentPage === startPage + index ? 'white' : 'gray'}
          bgcolor={currentPage === startPage + index ? 'primary' : 'white'}
        >
          {startPage + index}
        </StyledButtonPage>
      ))}

      <StyledButtonArrows onClick={handleNextPage} bgcolor="white">
        <Icon name="MdKeyboardArrowRight" size={15} />
      </StyledButtonArrows>
      <StyledButtonArrows onClick={handleLastPage} bgcolor="white">
        <Icon name="MdKeyboardDoubleArrowRight" size={15} />
      </StyledButtonArrows>
    </Wrapper>
  )
}
