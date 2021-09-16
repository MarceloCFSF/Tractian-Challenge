import { Space } from "antd";
import { Container, Grid } from './styles'
import { Item } from '../../components/Item';

export function Home() {
  var companies = ["Empresa Teste", "Empresa Teste 1", "Empresa Teste", "Empresa Teste", "Empresa Teste"]

  return (
    <>
      <Container>
        <h1>SELECIONE UMA EMPRESA:</h1>
        <Grid>
          {companies.map((company, index) => (
            <Item key={index} title={company}/>  
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Home;