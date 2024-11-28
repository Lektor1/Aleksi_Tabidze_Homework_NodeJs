class Car {
  constructor(color) {
    this.color = color;
  }

  getColor() {
    return this.color;
  }
}

class RacingCar extends Car {
  constructor(color, speed) {
    super(color);
    this.speed = speed;
  }

  getSpeed() {
    return this.speed;
  }
}

class ElectricRC extends RacingCar {
  constructor(color, speed, batteryCharge) {
    super(color, speed);
    this.batteryCharge = batteryCharge;
  }

  getBatteryCharge() {
    return this.batteryCharge;
  }
}

function demo() {
  const car = new Car("Red");
  console.log(`Car color: ${car.getColor()}`);

  const racingCar = new RacingCar("Blue", 200);
  console.log(
    `RacingCar color: ${racingCar.getColor()}, speed: ${racingCar.getSpeed()} km/h`
  );

  const electricRC = new ElectricRC("Green", 150, "2 hours");
  console.log(
    `ElectricRC color: ${electricRC.getColor()}, speed: ${electricRC.getSpeed()} km/h, battery life: ${electricRC.getBatteryCharge()}`
  );
}

demo();
