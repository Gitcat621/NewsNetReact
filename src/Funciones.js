import Swal from 'sweetalert2'
import whitReactContent from 'sweetalert2-react-content'

export function show_alerta(mensaje,icono,foco=''){
    Onfocus(foco);
    const MySwal = whitReactContent(Swal);
    MySwal.fire({
        title: mensaje,
        icon: icono
    });
}

function Onfocus(foco){
    if(foco !== ''){
        document.getElementById(foco).focus();
    }
}