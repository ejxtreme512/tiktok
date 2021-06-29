import { Divider } from '@material-ui/core';
import TokTabs from './TokTabs';
import { BrowserRouter } from "react-router-dom";


function Tokify() {
    return (
        <div className='flex flex-column tokify pad-5 overflow-auto'>
            <div className="flex">
                <h2>Tokify</h2>
            </div>
            <Divider></Divider>
            <BrowserRouter>
                <TokTabs></TokTabs>
            </BrowserRouter>
        </div>
    );
}

export default Tokify;