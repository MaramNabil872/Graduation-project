import React from 'react';
import './BakeryPage.css'; // Import your CSS file for styling
import bakeryLogo from '../../../public/assets/images/348s.jpg'; // Import the bakery logo image

const BakeryPage = () => {
    return (
        <div> <h1 className='title'>Stores</h1>
        <div className="bakery-container" Link="to ./Nod Bakery">
           
             <img src={bakeryLogo} alt="Nod Bakery Logo" className="bakery-logo" />
             <div>
            <h1 className="bakery-title">Nude Bakery</h1>
            <div className="bakery-store">
               
                <p className="bakery-description">Welcome to Nod Bakery, your go-to place for the freshest and most delicious baked goods in town.</p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default BakeryPage;
