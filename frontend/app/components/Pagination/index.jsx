import { Wrapper, Icon, Text, Input } from '..'
import { Container, Page } from './styles'

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  resultsInPage,
  totalResults
}) {
  const showPages = 1
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

  const handleChangePage = (event) => {
    const inputPage = parseInt(event.target.value)

    if (!isNaN(inputPage) && inputPage >= 1 && inputPage <= totalPages) {
      onPageChange(inputPage)
    }
  }

  return (
    <Container flexbox justify="space-between" padding="p10" align="center">
      <Text fontSize="small" color="gray">
        {`Exibindo ${resultsInPage} de ${totalResults} resultados`}
      </Text>
      <Wrapper
        flexbox
        align="center"
        corner="card"
        bgcolor="white"
        padding="p10"
        justify="space-between"
      >
        <Wrapper flexbox gap="g15" align="center">
          <Wrapper onClick={handlePreviousPage}>
            <Icon name="MdKeyboardArrowLeft" size={16} />
          </Wrapper>

          {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <Page
              key={startPage + index}
              onClick={() => onPageChange(startPage + index)}
              corner="form"
              color={currentPage === startPage + index ? 'white' : 'gray'}
              bgcolor={currentPage === startPage + index ? 'primary' : 'white'}
            >
              <Text fontSize="small" color="white">
                {startPage + index}
              </Text>
            </Page>
          ))}

          <Wrapper onClick={handleNextPage}>
            <Icon name="MdKeyboardArrowRight" size={16} />
          </Wrapper>
        </Wrapper>
        <Wrapper flexbox align="center" padding="horizontal" gap="g8">
          <Text color="gray" fontSize="small">
            Ir para a página
          </Text>
          <Wrapper flexbox width="60px" align="center">
            <Input
              placeholder="Ex: 2"
              onChange={(event) => handleChangePage(event)}
            />
          </Wrapper>
        </Wrapper>
      </Wrapper>
    </Container>
  )
}
