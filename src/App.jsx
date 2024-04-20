/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react'
import Guitarra from "./components/Guitarra"
import Header from "./components/Header"
import { db } from './data/db';

function App() {
  const initialCart = () =>{
    const localStorageCart = localStorage.getItem('cart')
    return localStorage ? JSON.parse(localStorageCart) : []
  }


  const [data] = useState(db)
  const [car, setCar] = useState(initialCart)

  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;

  useEffect(()  =>{
    localStorage.setItem('cart', JSON.stringify(car))
  },[car])

  function addToCar(item) {
    const itemExist = car.findIndex((guitar) => guitar.id === item.id)
    
    if(itemExist >= 0){
      const updatedCar = [...car]
      updatedCar[itemExist].quantity++
      setCar(updatedCar);
    }else{
      item.quantity = 1
      setCar([...car, item])
    }
  }

  //Elimina item del arreglo
  function removeFromCart(id) {
    setCar(prevCar => prevCar.filter(guitar => guitar.id !== id))
  }


  //incrementar cantidad
  function incrementQuantity(id) {
    const updatedCar = car.map(item => {
      if(item.id === id && item.quantity < MAX_ITEMS){
        return{
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })

    setCar(updatedCar)
  }


  //decrementar cantidad
  function decementarQuantity(id) {
    const updatedCar = car.map(item => {
      if(item.id === id && item.quantity > MIN_ITEMS){
        return{
          ...item,
          quantity: item.quantity - 1
        }
      }
      return item
    })

    setCar(updatedCar)
  }


  //Lipiar el carrito
  function clearCart(e) {
    setCar([])
  }

  return (
    <>
      
    <Header
      car={car}
      removeFromCart={removeFromCart}
      incrementQuantity={incrementQuantity}
      decementarQuantity={decementarQuantity}
      clearCart={clearCart}
    />

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map((guitar)=> (
              <Guitarra
                key={guitar.id} 
                guitar = {guitar}
                setCar={setCar}
                addToCar={addToCar}
              />
            )
          )}
            
        </div>
    </main>

    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

    </>
  )
}

export default App
