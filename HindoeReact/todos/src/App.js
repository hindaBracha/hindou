import { Provider } from 'react-redux';
import './App.css';
import { Main } from './comp/Main';
// import { Operations } from './Comp/Operations';
// import { Provider } from 'react-redux';
// import Payment from './Comp/Payment';
import store from './comp/Store';


function App() {
  return <>
  {/* <BasicTextFields></BasicTextFields> */}
  <Provider store={store}>
<Main></Main>
{/* <Payment></Payment> */ }
</Provider>
{/* <BasicTextFields></BasicTextFields> */}
{/* <BasicModal/> */}
{/* <RecipeReviewCard/> */}
{/* <AccountMenu></AccountMenu> */}
{/* <Login></Login> */}
{/* <PrimarySearchAppBar></PrimarySearchAppBar> */}
{/* <Operations></Operations> */}
{/* <Gg></Gg> */}
</>
}

export default App;