let Notify;
(function (Notify) {
  function Error(message, autoCloseDuration) {
    Show('error', message, autoCloseDuration, ShowNotificationBar('error'));
  }
  Notify.Error = Error;

  function Success(message, autoCloseDuration) {
    Show('success', message, autoCloseDuration, ShowNotificationBar('success'));
  }
  Notify.Success = Success;

  function Warning(message, autoCloseDuration) {
    Show('warning', message, autoCloseDuration, ShowNotificationBar('warning'));
  }
  Notify.Warning = Warning;

  function Close(notify) {
    notify.classList.remove('active');
    notify.classList.remove('success');
    notify.classList.remove('error');
    notify.addEventListener('transitionend', function (e) {
      const parent = e.currentTarget.parentNode;
      if (e.propertyName != 'bottom' || parent == null) return;
      setTimeout(function () {
        const childs = parent.getElementsByClassName('component-notify').length;
        if (childs === 0) parent.remove();
      }, 0);

      e.currentTarget.remove();
    });
  }
  Notify.Close = Close;

  function ShowNotificationBar(notificationType) {
    const wrapp = document.createElement('div');
    wrapp.className = 'component-notify';

    const textContent = document.createElement('div');
    textContent.className = '--text';
    const btnClose = document.createElement('div');
    btnClose.className = '--button-close';
    btnClose.addEventListener('click', function (e) {
      e.stopPropagation();
      const component = e.target.closest('.component-notify');
      Close(component);
    });
    btnClose.innerHTML = '<span>&#10006;</span>';

    wrapp.appendChild(textContent);
    wrapp.appendChild(btnClose);

    let container = document.getElementById('notify-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'notify-container';
      document.body.appendChild(container);
    }

    container.insertAdjacentElement('afterBegin', wrapp);
    return wrapp;
  }

  function Show(className, message, autoCloseDuration, notify) {
    message = message || '«Notify»';
    const mainContainer = notify.closest('#notify-container'),
      textContainer = notify.getElementsByClassName('--text')[0];
    textContainer.textContent = message;
    setTimeout(function () {
      notify.classList.add('active');
      notify.classList.add(className);
    }, 0);

    if (autoCloseDuration)
      setTimeout(function () {
        Notify.Close(notify);
      }, autoCloseDuration);
  }
})(Notify || (Notify = {}));

export { Notify };
