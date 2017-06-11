Dux.setState({
  count: 1
});


Dux.middleware( ( {type, value} ) => {
  switch (type) {
    case 'increment':
      console.log('É increment e o value é:', value)
  }
})