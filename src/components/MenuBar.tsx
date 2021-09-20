import { useEffect, useState } from "react";
import { IAsset, ICompany, IItem, IUnit, IUser } from "../types/global.type";
import { Button, Menu, List } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import api from "../services/api";
import {
  UserOutlined,
  PlusOutlined
} from '@ant-design/icons';
import NewUser from "./NewUser";
import NewCompany from "./NewCompany";
import NewUnit from "./NewUnit";
import NewAsset from "./NewAsset";

interface IParams {
  show: () => void;
  set: React.Dispatch<React.SetStateAction<IAsset | undefined>>
}

const MenuBar: React.FC<IParams> = ({show, set}) => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [units, setUnits] = useState<IUnit[]>([]);
  const [users, setUsers] = useState<IUser[]>([])
  const [assets, setAssets] = useState<IAsset[]>([])
  const [editCompany, setEditCompany] = useState<boolean>(false)
  const [editUnit, setEditUnit] = useState<boolean>(false)
  const [editUser, setEditUser] = useState<boolean>(false)
  const [editAsset, setEditAsset] = useState<boolean>(false)

  useEffect(() => {
    function getFromApi<type>(
      path:string, 
      set:React.Dispatch<React.SetStateAction<type>>,
    ) {
      api
        .get<type>(path)
        .then(({data}) => set(data))
        .catch(err => console.error("An error has occurred", err))
    }

    getFromApi<ICompany[]>("/companies", setCompanies)
    getFromApi<IUnit[]>("/units", setUnits)
    getFromApi<IUser[]>("/users", setUsers)
    getFromApi<IAsset[]>("/assets", setAssets)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleButton(asset:Extract<IItem, IAsset>) {
    set(asset)
    show()
  }

  function getUnits(id:number) {
    return units.filter(unit => unit.companyId === id)
  }

  function getUsers(companyId:number, unitId:number) {
    return users.filter(user => 
      user.companyId === companyId && user.unitId === unitId  
    )
  }

  function getAssets(companyId:number, unitId:number) {
    return assets.filter(asset => 
      asset.companyId === companyId && asset.unitId === unitId  
    )
  }

  type IAddButton = {
    onClick: () => void
  }
  
  return (
    <>
      <NewCompany 
        visible={editCompany}
        setVisible={setEditCompany}
      />
      <Menu
        mode="inline"
      >
        <Menu.ItemGroup title="Empresas">
          {companies.map(company => (
            
            <SubMenu key={"units" + company.id} title={company.name}>
              <Menu.ItemGroup title="Unidades">
                {getUnits(company.id).map(unit => (
                  <SubMenu key={unit.id} title={unit.name}>
                    
                    <SubMenu 
                      key={"users" + unit.id} 
                      title="Usuários" 
                      icon={<UserOutlined />}
                    >
                      {getUsers(company.id, unit.id).map(
                        ({id, name, email}) => (
                          <Menu.Item key={"user" + id}>
                            <List.Item.Meta
                              title={name}
                              description={email}
                            />
                          </Menu.Item>
                        )
                      )}
                      <NewUser 
                        visible={editUser}
                        setVisible={setEditUser}
                        companyId={company.id}
                        unitId={unit.id}
                      />
                      <Menu.Item key="Add user">
                        <Button 
                          icon={<PlusOutlined />}
                          type="dashed"
                          onClick={() => setEditUser(true)}
                        >Adicionar</Button>
                      </Menu.Item>
                    </SubMenu>

                    <SubMenu key={"assets" + unit.id} title="Ativos">
                      {getAssets(company.id, unit.id).map((asset) => (
                        <Menu.Item key={"asset" + asset.id}>
                          <Button 
                            onClick={() => handleButton(asset)}
                            type="text"
                          >
                            {asset.name}
                          </Button>
                        </Menu.Item>
                      ))}
                      <NewAsset 
                        visible={editAsset}
                        setVisible={setEditAsset}
                        companyId={company.id}
                        unitId={unit.id}
                      />
                      <Menu.Item key="Add Asset">
                        <Button 
                          icon={<PlusOutlined />}
                          type="dashed"
                          onClick={() => setEditAsset(true)}
                        >Adicionar</Button>
                      </Menu.Item>
                    </SubMenu>
                  </SubMenu>
                ))}
                <NewUnit 
                  visible={editUnit}
                  setVisible={setEditUnit}
                  companyId={company.id}
                />
                <Menu.Item key="Add Unit">
                  <Button 
                    icon={<PlusOutlined />}
                    type="dashed"
                    onClick={() => setEditUnit(true)}
                  >Adicionar</Button>
                </Menu.Item>
              </Menu.ItemGroup>
            </SubMenu>
          ))}
          <Button 
            icon={<PlusOutlined />}
            type="dashed"
            onClick={() => setEditCompany(true)}
          >Adicionar</Button>
        </Menu.ItemGroup>
      </Menu>
    </>
  );
}

export default MenuBar;