import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ScreenSaverOption } from 'ngx-screen-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  variants = [
    {
      name: 'fireworks',
      value: 'fireworks',
    },
    {
      name: 'DVD',
      value: 'dvd',
    },
    {
      name: 'stars',
      value: 'stars',
    },
  ];

  variant: ScreenSaverOption = 'fireworks';
  idleAfterMs: number = 10000;
  opacity: number = 1;
  zIndex: number = 1;

  renderScreenSaverComponent?: boolean;

  defaultValues = {
    variant: 'fireworks',
    idleAfterMs: 10000,
    opacity: 1,
    zIndex: 1,
  };

  form = this.fb.group({
    variant: 'fireworks',
    idleAfterMs: 10000,
    opacity: 1,
    zIndex: 1,
  });

  onSubmitButtonClick() {
    // update lokalnych wartosci do tych z formularza i rerender komponentu
    console.log('submitting');

    const { variant, idleAfterMs, opacity, zIndex } = this.form.value;

    this.variant = variant;
    this.idleAfterMs = idleAfterMs;
    this.opacity = opacity;
    this.zIndex = zIndex;

    this.rerenderScreenSaverComponent();
  }

  onResetButtonClick(event: Event) {
    // reset formularza do initialState i rerender komponentu
    event.preventDefault();

    this.form.reset(this.defaultValues);

    this.rerenderScreenSaverComponent();
  }

  rerenderScreenSaverComponent() {
    // tutaj magia ktora niszczy i tworzy na nowo <ngx-screen-saver></ngx-screen-saver>
    this.renderScreenSaverComponent = false;
    this.renderScreenSaverComponent = true;
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((formValue) => {
      // console.log(formValue);

      this.variant = formValue.variant;
    });
  }
}
