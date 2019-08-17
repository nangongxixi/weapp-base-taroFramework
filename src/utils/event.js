let listeners = {}

export function on(evt, callback, run) {
  if (!listeners[evt]) {
    listeners[evt] = []
  }
  listeners[evt].push(callback)
  if (run) {
    callback(evt)
  }
}

export function trigger(evt) {
  if (!listeners[evt]) {
    return
  }

  let args = [].slice.call(arguments, 1)
  const len = listeners[evt].length
  for (let i = 0; i < len; i++) {
    listeners[evt][i].apply(this, args)
  }
}

export default {
  on: function(evt, callback) {
    on(evt, callback)
    return this
  },
  trigger: function(evt) {
    trigger(evt)
  }
}

export function onPageReload(event, page) {
  on(event, () => {
    page.reload = true
    page.$apply()
  })
}
