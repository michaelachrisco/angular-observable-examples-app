import { NgModule }                                   from '@angular/core';
import { RouterModule, Routes }                       from '@angular/router';

import { ColdExample1Component }                      from './cold-example-1/cold-example-1.component';
import { ColdExample2PresentationComponent }          from './cold-example-2/cold-example-2-presentation.component';
import { ColdExample2SmartComponent }                 from './cold-example-2/cold-example-2-smart.component';
import { ConditionalValidationComponent }             from './conditional-validation/conditional-validation.component';
import { DynamicFormSubscriptionComponent }           from './dynamic-form-subscription/dynamic-form-subscription.component';
import { ExamplesRouterComponent }                    from './examples-router.component';
import { HigherOrderOperatorsSmartComponent }         from './higher-order-operators/higher-order-smart.component';
import { HigherOrderOperatorsPresentationComponent }  from './higher-order-operators/higher-order-presentation.component';
import { HigherOrderOperators2SmartComponent }        from './higher-order-operators-2/higher-order-2-smart.component';
import { HigherOrderOperators2PresentationComponent } from './higher-order-operators-2/higher-order-2-presentation.component';
import { HotExample1Component }                       from './hot-example-1/hot-example-1.component';
import { PitfallFixesPresentationComponent }          from './pitfall-fixes/pitfall-fixes-presentation.component';
import { PitfallFixesSmartComponent }                 from './pitfall-fixes/pitfall-fixes-smart.component';
import { PitfallsPresentationComponent }              from './pitfalls/pitfalls-presentation.component';
import { PitfallsSmartComponent }                     from './pitfalls/pitfalls-smart.component';

const routes: Routes = [
 {
   path       : 'examples',
   component : ExamplesRouterComponent,
   data      : { title: 'Examples' },
   children  : [
    {
      path       : '',
      redirectTo : 'cold-1',
      pathMatch  : 'full',
    },
    {
      path      : 'cold-1',
      component : ColdExample1Component,
      data      : { title: 'Cold Example 1' },
    },
    {
      path      : 'cold-2',
      component : ColdExample2SmartComponent,
      data      : { title: 'Cold Example 2' },
    },
    {
      path      : 'hot-1',
      component : HotExample1Component,
      data      : { title: 'Hot Example' },
    },
    {
      path      : 'higher-order',
      component : HigherOrderOperatorsSmartComponent,
      data      : { title: 'Higher Order' },
    },
    {
      path      : 'higher-order-2',
      component : HigherOrderOperators2SmartComponent,
      data      : { title: 'Higher Order 2' },
    },
    {
      path      : 'conditional-validation',
      component : ConditionalValidationComponent,
      data      : { title: 'Conditional Validation' },
    },
    {
      path      : 'dynamic-form',
      component : DynamicFormSubscriptionComponent,
      data      : { title: 'Dynamic Form' },
    },
    {
      path      : 'pitfalls',
      component : PitfallsSmartComponent,
      data      : { title: 'Pitfalls' },
    },
    {
      path      : 'pitfall-fixes',
      component : PitfallFixesSmartComponent,
      data      : { title: 'Pitfall Fixes' },
    },
   ],
 },
];

@NgModule({
  imports : [ RouterModule.forChild(routes) ],
  exports : [ RouterModule ]
})
export class ExamplesRoutingModule {}

export const routedComponents = [
  ExamplesRouterComponent,
  ColdExample1Component,
  ColdExample2PresentationComponent,
  ColdExample2SmartComponent,
  ConditionalValidationComponent,
  DynamicFormSubscriptionComponent,
  HigherOrderOperatorsPresentationComponent,
  HigherOrderOperatorsSmartComponent,
  HigherOrderOperators2PresentationComponent,
  HigherOrderOperators2SmartComponent,
  HotExample1Component,
  PitfallsPresentationComponent,
  PitfallsSmartComponent,
  PitfallFixesPresentationComponent,
  PitfallFixesSmartComponent,
];
