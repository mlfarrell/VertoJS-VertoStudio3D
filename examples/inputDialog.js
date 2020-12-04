console.log('Verto Studio ' + VertoStudio.version());

VertoStudio.inputDialog({
  title: 'Example Dialog',
  params: [
    {
      name: 'Param1',
      type: 'decimal',
      min: 0.0,
      max: 10.0,
      value: 1.0
    },
    {
      name: 'Param2',
      type: 'integer',
      min: 0,
      max: 10,
      value: 1
    },    
    {
      name: 'Param3',
      type: 'string',
      value: 'This is a string'
    },
    {
      name: 'Param4',
      type: 'bool',
      value: true
    },        
  ]
}, (values) => {
  if(!values) {
    return;
  }

  console.log('we got back: ' + values['Param1'].value);
  console.log('we got back: ' + values['Param2'].value);  
  console.log('we got back: ' + values['Param3'].value);
  console.log('we got back: ' + values['Param4'].value);
});

