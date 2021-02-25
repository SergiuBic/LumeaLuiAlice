const CheckoutSteps = {
    render: (props) => {
        return `<div class="checkout-steps">
            <div class="${props.step1? 'active': 'empty'}">Autentificare</div>
            <div class="${props.step2? 'active': 'empty'}">Livrare</div>
            <div class="${props.step3? 'active': 'empty'}">Modalitatea de Plata</div>
            <div class="${props.step4? 'active': 'empty'}">Plaseaza comanda</div>
        </div>`
    }
}
export default CheckoutSteps;