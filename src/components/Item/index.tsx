import { Container } from './styles'

interface Company {
  title: string;
}

export function Item({title}:Company) {
  return (
    <Container>
      <h1>{title}</h1>
    </Container>
  )
}