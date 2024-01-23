import Swal from 'sweetalert2';

const Home = () => {
    const ss = () => {
        console.log('swall');
        Swal.fire("SweetAlert2 is working!");
    }
    return (
        <div>
            <h1>home page</h1>
            <button onClick={ss}> seal</button>
        </div>
    );
};

export default Home;