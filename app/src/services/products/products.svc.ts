import {async, register} from 'platypus';
import BaseService from '../base/base.svc';
import UserRepository from '../../repositories/user/user.repo';

export default class ProductsService extends BaseService {

    constructor(private productsService: ProductsService) {
        super();
    }
    placeOrder(): void {
        this.productsService.placeOrder(this.context.order).then((success) => {
            this.navigator.navigate(ConfirmationViewControl);
        }).catch((error) => {
            this.context.error = error;
        });
    }

    getProducts(): async.IThenable<Array<models.IProduct>> {
        return this.json(this.host + '/products/all');
    }

    placeOrder(order: models.IOrder): async.IThenable<boolean> {
        order.userid = this.userRepository.userid;
        return this.json(this.host + '/orders/create', order, 'POST')
            .then((success) => {
                return true;
            });
    }
}

register.injectable('products-svc', ProductsService, [UserRepository]);