import { Component, AfterViewInit, ViewChild, ElementRef } from "@angular/core";

declare let paypal: any;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit {
  finalAmount: number = 1;
  @ViewChild("paypal") paypalele: ElementRef;

  product = {
    price: this.finalAmount,
    description: "demo",
    img: "assests/x.png",
  };
  padiFor = false;
  ngAfterViewInit() {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  //currency_code: "USD",
                  value: this.finalAmount,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.padiFor = true;
          console.log(order);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(this.paypalele.nativeElement);
  }
}
