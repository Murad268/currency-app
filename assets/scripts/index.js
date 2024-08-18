document.addEventListener('DOMContentLoaded', () => {
  const selects = document.querySelectorAll('select');
  const loadingElement = document.getElementById('loading');
  const convertButton = document.getElementById('convertButton');

  const toggleLoading = (isLoading) => {
    loadingElement.style.display = isLoading ? 'block' : 'none';
    convertButton.disabled = isLoading;
  };

  toggleLoading(true); 

  getData('https://bookingbot.muraddev.com/').then(res => {
    selects.forEach(select => {
      res.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.code;
        optionElement.textContent = `${option.code} - ${option.name}`;
        select.appendChild(optionElement);
      });
    });
    toggleLoading(false); 
  });

  document.getElementById('currencyForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;

    if (amount && fromCurrency && toCurrency) {
      toggleLoading(true);

      getData('https://bookingbot.muraddev.com/').then(res => {
        const fromRate = res.find(item => item.code === fromCurrency).value;
        const toRate = res.find(item => item.code === toCurrency).value;

        if (fromRate && toRate) {
          const result = (amount * fromRate) / toRate;
          document.getElementById('result').textContent = `Nəticə: ${result.toFixed(2)} ${toCurrency}`;
        } else {
          document.getElementById('result').textContent = 'Məlumat əldə edilə bilmədi.';
        }

        toggleLoading(false); 
      });
    } else {
      document.getElementById('result').textContent = 'Lütfən, bütün sahələri doldurun.';
    }
  });
});

const getData = async (url) => {
  const res = await fetch(url);
  return await res.json();
};
