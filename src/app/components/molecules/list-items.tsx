import { City, ICity } from "../atoms/city";

interface Props {
  cities: ICity[]
}

const getPosition = (index: number) => {
  if(index === 0) return 'primary'
  else if(index === 1) return 'secondary'
  else if(index === 2) return 'tertiary'
  else return 'other'
}

export function ListCities({ cities } : Props) {
  return (
    <>
    { cities
      .sort((a, b) => a.distance - b.distance)
      .map((city, index) => 
        <City 
          key={index} 
          text={city.text} 
          distance={city.distance} 
          position={getPosition(index)} />)}
    </>
  )
}