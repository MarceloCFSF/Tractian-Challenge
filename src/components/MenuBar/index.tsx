import { useEffect, useState } from "react";
import { IAsset, ICompany, IItem, IUnit, IUser } from "../../types/global.type";
import { Menu } from "antd";
import SubMenu from "antd/lib/menu/SubMenu";
import api from "../../services/api";

interface IParams {
  show: () => void;
  set: React.Dispatch<React.SetStateAction<IAsset | undefined>>
}

const MenuBar: React.FC<IParams> = ({show, set}) => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [units, setUnits] = useState<IUnit[]>([]);
  const [users, setUsers] = useState<IUser[]>([])
  const [assets, setAssets] = useState<IAsset[]>([])

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
  
  return (
    <Menu
      mode="inline"
    >
      <Menu.ItemGroup title="Empresas">
        {companies.map(company => (
          
          <SubMenu key={"units" + company.id} title={company.name}>
            <Menu.ItemGroup title="Unidades">
              {/* <div>Add Unidade</div> */}
              {getUnits(company.id).map(unit => (
                <SubMenu key={unit.id} title={unit.name}>
                  
                  <SubMenu 
                    key={"users" + unit.id} 
                    title="Usuários" 
                  >
                    {getUsers(company.id, unit.id).map(
                      ({id, name, email}) => (
                        <Menu.Item key={"user" + id}>{name}</Menu.Item>
                      )
                    )}
                  </SubMenu>

                  <SubMenu key={"assets" + unit.id} title="Ativos">
                    {getAssets(company.id, unit.id).map((asset) => (
                      <Menu.Item key={"asset" + asset.id}>
                        {asset.name}
                      </Menu.Item>
                    ))}
                  </SubMenu>
                </SubMenu>
              ))}
            </Menu.ItemGroup>
          </SubMenu>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );
}

export default MenuBar;