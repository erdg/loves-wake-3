# appilication startup
#
# loves-wake-3 $ pil server/main.l -main -go
#
# everything is within 'loves-wake-3' directory


# see 'api.l' for allowed functions
(allowed ("server"))

# load deps
#
# NOTE - these will need to be installed on the server
# see github.com/...
#     aw/picolisp-[json|bcrypt]
#     ergd/picolisp-[minimal-http|mail-html|jwt]
[let Prefix "server/lib/"
   (mapcar '((Lib) (load (pack Prefix Lib)))
      (list
         # edit below 
         "picolisp-mail-html/mail-html.l"
         "picolisp-json/json.l"
         "picolisp-minimal-http/http.l"
         "picolisp-bcrypt/bcrypt.l"
         "picolisp-jwt/jwt.l"
]

# load api routes
# this file contains 'dbs call
(load "server/api.l")


## load config values

# jwt secret key
# WARNING -- CHANGE THIS SUPER SECRET KEY TO 
# SOMETHING SECURE FOR PRODUCTION
(setq *Secret "Secret")

# production
# (setq *Secret (rc "loves-wake-3/.config" '*Secret))

# email address
(setq *Email "erik@erikdgustafson.com")

[setq 
   *Pool "db/"
   *Blob "blob/"
   *API 
      (if *Dbg
         # office
         "http://192.168.0.48:8887/"
         # kathleen's place
         # "http://192.168.0.23:8887/"
         # parents' place
         # "http://10.0.0.98:8887/"
         # "https://erikdgustafson.com/api/" )
         "https://erikdgustafson.com/lw3/" )
]

# FIXME - this allows access to the blob directory.
# I think only through the picolisp process, but I'm
# not sure of the security implications. Research needed.
# Make sure that it can only be written by the picolisp 
# process. Or just send images to the client instead of
# referencing them on the server.

# UPDATE - *Blob is now seperate from the DB directory.
# DB directory access is blocked by nginx. No outside traffic
# allowed to access it, only the locally running PL process.
# Secure? It will have to do for now.
(allow *Blob T)

(de main ()
   (call "mkdir" "-p" *Pool *Blob)
   (pool *Pool *Dbs) )

(de go () 
   (retire 10)
   (server 8887) )
