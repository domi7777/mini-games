const spaceship = {
    // path2D: new Path2D('m-21.10907,21.90683c0,-0.14773 0,-0.14773 0,-0.29545c0,-0.29545 -0.09465,-0.59854 0,-1.18182c0.07483,-0.46112 0.20917,-0.70334 0.44318,-1.18182c0.20524,-0.41965 0.50462,-0.70334 0.73864,-1.18182c0.20524,-0.41965 0.59091,-0.88636 0.88636,-1.47727c0.14773,-0.29545 0.37217,-0.67337 0.73864,-1.18182c0.38629,-0.53595 0.67504,-1.34919 0.88636,-1.92045c0.22921,-0.61962 0.46875,-1.01233 0.59091,-1.18182c0.19315,-0.26798 0.23426,-0.38199 0.44318,-0.59091c0.20892,-0.20892 0.02557,-0.42142 0.14773,-0.59091c0.38629,-0.53595 0.25003,-0.76611 0.44318,-1.03409c0.12216,-0.16948 0.32103,-0.56915 0.44318,-0.73864c0.19315,-0.26798 0.14773,-0.59091 0.29545,-0.88636c0.14773,-0.29545 0.30377,-0.47814 0.44318,-0.73864c0.25133,-0.46961 0.54549,-0.61839 0.73864,-0.88636c0.12216,-0.16948 0.02892,-0.68676 0.59091,-1.03409c0.37699,-0.23299 0.59091,-0.59091 1.03409,-1.03409c0.14773,-0.14773 0.39776,-0.47066 0.59091,-0.73864c0.12216,-0.16948 0.33872,-0.48645 0.44318,-0.59091c0.10446,-0.10446 0.29545,-0.14773 0.29545,-0.29545c0,-0.14773 0.02249,-0.18239 0.29545,-0.29545c0.19301,-0.07995 0.14773,-0.44318 0.14773,-0.59091c0,0 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.29545c0,-0.14773 0.06778,-0.25017 0.14773,-0.44318c0.05653,-0.13648 -0.10446,-0.191 0,-0.29545c0.10446,-0.10446 0.14773,-0.14773 0.14773,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.29545 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0,-0.44318c0,0 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0,-0.44318c0,0 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.44318 0,-0.59091c0,0 -0.14773,-0.14773 -0.29545,-0.59091c0,0 -0.0729,-0.27752 -0.14773,-0.73864c-0.07099,-0.43746 0,-0.44318 0,-0.88636c0,-0.14773 -0.07183,-0.41715 -0.14773,-0.73864c-0.03394,-0.14377 -0.14773,-0.59091 -0.14773,-0.59091c0,-0.29545 0,-0.59091 0,-0.88636c0,-0.29545 0,-0.59091 0,-0.88636c0,-0.29545 0,-0.59091 0,-0.73864c0,-0.14773 0,-0.44318 0,-0.59091c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.29545 0,-0.44318 0,-0.59091c0,-0.29545 0,-0.59091 0,-0.73864c0,-0.29545 0,-0.44318 0,-0.44318c0,-0.29545 0,-0.44318 0,-0.59091c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.29545 0,-0.44318 0,-0.59091c0,-0.14773 0,-0.29545 0,-0.44318c0,0 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0.04327,-0.04327 0.14773,-0.14773c0.10446,-0.10446 0,-0.29545 0,-0.44318c0,-0.14773 -0.10446,-0.191 0,-0.29545c0.10446,-0.10446 0.29545,-0.14773 0.29545,-0.29545c0,-0.14773 0,-0.14773 0.14773,-0.14773c0.14773,0 0.29545,0 0.44318,0c0,0 0,-0.14773 0.14773,-0.14773c0.14773,0 0.33872,0.10446 0.44318,0c0.10446,-0.10446 0.14773,-0.14773 0.29545,-0.14773c0.14773,0 0.191,-0.04327 0.29545,-0.14773c0.10446,-0.10446 0.191,-0.04327 0.29545,-0.14773c0.10446,-0.10446 0.29545,0 0.29545,-0.14773c0,-0.29545 0.2155,-0.25017 0.29545,-0.44318c0.05653,-0.13648 0.14773,-0.29545 0.29545,-0.44318c0,0 0.14773,-0.14773 0.14773,-0.14773c0.14773,-0.14773 0.2155,-0.25017 0.29545,-0.44318c0.05653,-0.13648 0.06778,-0.10244 0.14773,-0.29545c0.05653,-0.13648 -0.05653,-0.3067 0,-0.44318c0.07995,-0.19302 0.14773,-0.29545 0.14773,-0.44318c0,-0.14773 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,0 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0.29545,-0.29545c0.14773,0 -0.06119,-0.23426 0.14773,-0.44318c0.10446,-0.10446 0.14773,-0.14773 0.14773,-0.14773c0.29545,-0.14773 0.44318,-0.29545 0.44318,-0.44318c0,-0.14773 0.06778,-0.10244 0.14773,-0.29545c0.05653,-0.13648 0.14773,-0.29545 0.14773,-0.44318c0,-0.14773 0,-0.29546 0,-0.44318c0,-0.14773 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,0 0.03466,-0.02249 0.14773,-0.29545c0.07995,-0.19302 0.14773,-0.29545 0.14773,-0.29545c0,-0.14773 0.14773,-0.29545 0.14773,-0.44318c0,-0.14773 0.14773,-0.14773 0.14773,-0.29545c0,-0.14773 0.04327,-0.191 0.14773,-0.29545c0.10446,-0.10446 0.14773,0 0.29545,0c0.14773,0 0.36323,0.10244 0.44318,0.29545c0.05653,0.13648 0.06188,0.35733 0.29545,0.59091c0.23358,0.23358 0.36323,0.10244 0.44318,0.29545c0.05653,0.13648 0.23892,0.3067 0.29545,0.44318c0.07995,0.19302 0.16219,0.26952 0.44318,0.44318c0.12566,0.07767 0.2155,0.10244 0.29545,0.29545c0.05653,0.13648 0.2155,0.25017 0.29545,0.44318c0.05653,0.13648 0.04327,0.48645 0.14773,0.59091c0.10446,0.10446 0.14773,0.29545 0.14773,0.59091c0,0 0.14773,0.29545 0.29545,0.59091c0,0 0.26151,0.15168 0.29545,0.29545c0.07589,0.32149 0.14773,0.29545 0.14773,0.59091c0,0.14773 0.07183,0.41714 0.14773,0.73864c0.06788,0.28755 -0.11307,0.46567 0,0.73864c0.07995,0.19302 0.14773,0.44318 0.14773,0.59091c0,0.29545 0,0.59091 0,0.59091c0.14773,0.14773 0.14773,0.29545 0.29545,0.44318c0.14773,0.14773 0.33872,0.04327 0.44318,0.14773c0.10446,0.10446 -0.04529,0.2155 0.14773,0.29545c0.13648,0.05653 0.29545,0 0.44318,0c0,0 0.04327,0.191 0.14773,0.29545c0.10446,0.10446 0.29545,0 0.44318,0c0,0 0,0 0.14773,0c0.14773,0 0.29545,0.14773 0.44318,0.14773c0,0 0.14773,0.14773 0.29545,0.14773c0.14773,0 0.29545,0 0.29545,0c0.14773,0 0.3067,-0.05653 0.44318,0c0.19301,0.07995 0.191,0.04327 0.29545,0.14773c0.10446,0.10446 0.14773,0.14773 0.29545,0.14773c0.14773,0 0.14773,0.14773 0.14773,0.29545c0,0.14773 0.15897,0.23892 0.29545,0.29545c0.19301,0.07995 0.26151,0.15168 0.29545,0.29545c0.07589,0.32149 0.14773,0.29545 0.29545,0.44318c0.14773,0.14773 0.14773,0.44318 0.14773,0.59091c0,0.29545 0,0.44318 0,0.73864c0,0.29545 0,0.59091 0,0.73864c0,0.14773 0.07183,0.26942 0.14773,0.59091c0.03394,0.14378 0,0.14773 0,0.44318c0,0.14773 0,0.29545 0,0.29545c0,0.14773 0.14773,0.44318 0.14773,0.59091c0,0 0,0.29545 0,0.44318c0,0.14773 0.14773,0.14773 0.14773,0.59091c0,0.14773 0,0.29545 0,0.44318c0,0.29545 0,0.73864 0,0.88636c0,0.14773 0,0.59091 0,0.73864c0,0.44318 0,0.44318 0,0.88636c0,0.14773 0,0.29545 0,0.44318c0,0.29545 0,0.59091 0,0.73864c0,0.14773 0,0.44318 0,0.73864c0,0.29545 0,0.44318 0,0.59091c0,0.44318 0,0.59091 0,0.88636c0,0.29545 -0.06788,0.74654 0,1.03409c0.07589,0.32149 0.29545,0.44318 0.29545,1.03409c0,0 0,0.44318 0,0.59091c0,0.59091 0,0.73864 0,1.03409c0,0.14773 0,0.59091 0,0.73864c0,0.29545 0,0.59091 0,0.88636c0,0.29545 -0.10231,0.47066 -0.29545,0.73864c-0.24431,0.33896 -0.29545,0.59091 -0.29545,0.73864c0,0.14773 0,0.44318 0,0.59091c0,0 0,0.14773 0,0.44318c0,0.14773 0,0.29545 0,0.44318c0,0.29545 0,0.29545 0,0.44318c0,0.14773 0,0.29545 0,0.44318c0,0 0,0.14773 0,0.44318c0,0.14773 0,0.14773 0,0.29545c0,0.14773 0,0.44318 0,0.44318c0.14773,0.14773 0.12597,0.32103 0.29545,0.44318c0.26798,0.19315 0.23892,0.15897 0.29545,0.29545c0.07995,0.19301 0.44714,0.40924 0.59091,0.44318c0.32149,0.07589 0.54549,0.47066 0.73864,0.73864c0.24431,0.33896 0.38665,0.45443 0.44318,0.59091c0.07995,0.19301 0.51096,0.3979 0.59091,0.59091c0.11307,0.27296 0.06188,0.50506 0.29545,0.73864c0.23358,0.23358 0.36729,0.26942 0.44318,0.59091c0.06788,0.28755 0.18239,0.46567 0.29545,0.73864c0.07995,0.19301 0.22757,0.74654 0.29545,1.03409c0.07589,0.32149 0.28883,0.37658 0.44318,0.88636c0.04281,0.14139 0.18562,0.41319 0.29545,0.59091c0.2456,0.39739 0.14773,0.59091 0.14773,0.73864c0,0.29545 0.09119,0.45443 0.14773,0.59091c0.07995,0.19301 0.32103,0.2737 0.44318,0.44318c0.19315,0.26798 0.17561,0.50453 0.29545,0.59091c0.37897,0.27315 0.25194,0.78978 0.59091,1.03409c0.26798,0.19315 0.5909,0.59091 0.88636,0.88636c0.14773,0.14773 0.31534,0.56306 0.73864,0.88636c0.37125,0.28356 0.59091,0.44318 0.73864,0.59091c0.14773,0.14773 0.36323,0.54562 0.44318,0.73864c0.11307,0.27296 0.29545,0.59091 0.29545,0.59091c0.29545,0.14773 0.29545,0.29545 0.44318,0.44318c0.14773,0.14773 0.36323,0.10244 0.44318,0.29545c0.11307,0.27296 0.14773,0.44318 0.29545,0.59091c0.14773,0.14773 0.18239,0.46567 0.29545,0.73864c0.07995,0.19301 0.26152,0.29941 0.29545,0.44318c0.07589,0.32149 0.14773,0.44318 0.14773,0.44318c0.14773,0.29545 0.14773,0.44318 0.14773,0.59091c0,0 0.06778,0.10244 0.14773,0.29545c0.11307,0.27296 -0.02176,0.32103 0.14773,0.44318c0.26797,0.19315 0.29545,0.29545 0.29545,0.44318c0,0 0,0.14773 0,0.14773c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.29545,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.29545,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.14773,0 -0.29545,0c-0.29545,0 -0.44318,-0.14773 -0.44318,-0.14773c-0.14773,0 -0.44318,0 -0.59091,0c-0.14773,0 -0.29545,0 -0.59091,0c0,0 -0.14773,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.29545,0c-0.14773,0 -0.44318,0 -0.59091,0c0,0 -0.14773,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.14773,-0.14773 -0.14773,-0.14773c-0.14773,0 -0.44318,0 -0.59091,0c0,0 -0.15897,-0.09119 -0.29545,-0.14773c-0.19301,-0.07995 -0.29545,-0.14773 -0.29545,-0.14773c0,-0.14773 -0.29545,-0.14773 -0.44318,-0.14773c-0.14773,0 -0.14773,0 -0.29545,0c-0.29545,0 -0.44318,0 -0.59091,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.44318,0 -0.59091,0c-0.29545,0 -0.59091,0 -0.59091,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.14773,0 -0.14773,0.14773c0,0.14773 0,0.29545 0,0.44318c0,0 0,0.14773 0,0.29545c0,0.14773 0,0.29545 0,0.29545c0,0.14773 0,0.29545 0,0.44318c0,0.14773 0,0.14773 0,0.29545c0,0.14773 0,0.29545 0,0.44318c0,0 0,0.14773 0,0.29545c0,0.14773 0,0.29545 0,0.29545c0,0.14773 0,0.29545 0,0.44318c0,0.14773 0,0.14773 0,0.29545c0,0.29545 0,0.44318 0,0.44318c0,0.14773 0,0.59091 0,0.59091c0,0.14773 0,0.29545 0,0.59091c0,0 0,0.14773 0,0.29545c0,0.29545 -0.10446,0.33872 0,0.44318c0.10446,0.10446 0.14773,0.29545 0.14773,0.44318c0,0 0,0.14773 0,0.29545c0,0.14773 0,0.29545 -0.14773,0.29545c0,0 0,0 -0.14773,0c-0.14773,0 -0.29545,0 -0.44318,0c0,0 -0.14773,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.29545,0c-0.29545,0 -0.44318,0 -0.59091,0c0,0 -0.14773,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.14773,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.14773,-0.14773 -0.14773,-0.29545c0,-0.14773 0,-0.29545 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0,-0.29545c0,-0.29545 0,-0.44318 0,-0.59091c0,0 0,-0.14773 0,-0.29545c0,-0.29545 0,-0.29545 0,-0.59091c0,-0.14773 0,-0.29545 0,-0.29545c0,-0.14773 0,-0.44318 0,-0.59091c0,0 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,0 -0.14773,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.14773,-0.14773 -0.29545,-0.14773c-0.14773,0 -0.36323,-0.10244 -0.44318,-0.29545c-0.05653,-0.13648 -0.14773,-0.14773 -0.29545,-0.14773c-0.14773,0 -0.29545,0 -0.29545,0c-0.14773,-0.14773 -0.29545,-0.14773 -0.44318,-0.29545c-0.14773,-0.14773 -0.14773,-0.14773 -0.29545,-0.14773c-0.29545,0 -0.44318,0 -0.59091,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.44318,0 -0.59091,0c-0.14773,0 -0.44318,0 -0.59091,0c0,0 0.06119,0.08654 -0.14773,0.29545c-0.20892,0.20892 -0.33872,0.191 -0.44318,0.29545c-0.10446,0.10446 -0.33872,-0.10446 -0.44318,0c-0.10446,0.10446 0,0.29545 0,0.44318c0,0 0,0.14773 0,0.29545c0,0.14773 0,0.29545 0,0.44318c0,0.14773 0,0.29545 0,0.44318c0,0 0,0.14773 0,0.29545c0,0.14773 0,0.29545 0,0.29545c0,0.14773 0,0.44318 0,0.59091c0,0 0,0.29545 0,0.44318c0,0.14773 0,0.14773 0,0.29545c0,0.14773 0,0.29545 0,0.44318c0,0 0,0.14773 0,0.44318c0,0.14773 0,0.14773 0,0.29545c0,0.14773 0,0.29545 0,0.44318c0,0 0,0.14773 0,0.29545c0,0.14773 0,0.29545 0,0.29545c0,0.14773 0,0.29545 0,0.44318c0,0.14773 0,0.14773 0,0.29545c0,0.14773 0,0.29545 -0.14773,0.29545c0,0 -0.14773,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.29545,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.14773,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.44318,0c0,0 -0.14773,0 -0.44318,0c-0.14773,0 -0.16979,0.07766 -0.29545,0c-0.28099,-0.17366 -0.3067,-0.38665 -0.44318,-0.44318c-0.19301,-0.07995 -0.44318,-0.14773 -0.59091,-0.14773c0,0 -0.12597,-0.02557 -0.29545,-0.14773c-0.26798,-0.19315 -0.191,-0.191 -0.29545,-0.29545c-0.10446,-0.10446 -0.21561,-0.0079 -0.14773,-0.29545c0.07589,-0.32149 0.04986,-0.48898 0.29545,-0.88636c0.10984,-0.17772 0.29545,-0.44318 0.29545,-0.59091c0,-0.14773 0,-0.44318 0,-0.59091c0,-0.14773 0.14773,-0.29545 0.14773,-0.44318c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.29545 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,-0.14773 0,-0.14773 0,-0.29545c0,-0.14773 0,-0.29545 0,-0.44318c0,0 -0.14773,-0.14773 -0.29545,-0.29545c-0.14773,-0.14773 -0.29545,-0.14773 -0.29545,-0.14773c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.14773,0 -0.29545,0c-0.14773,0 -0.29545,-0.14773 -0.44318,-0.14773c0,0 0,-0.14773 -0.14773,-0.29545c-0.14773,-0.14773 -0.44318,-0.14773 -0.44318,-0.14773c-0.14773,0 -0.25017,-0.06778 -0.44318,-0.14773c-0.13648,-0.05653 -0.09119,-0.01124 -0.14773,-0.14773c-0.1599,-0.38603 -0.59091,-0.29545 -0.59091,-0.29545c-0.29545,0 -0.44318,0 -0.59091,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.14773,0 -0.44318,0c-0.29545,0 -0.44318,0 -0.73864,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.29545,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.14773,0.29545 -0.29545,0.29545c-0.29545,0 -0.29545,0.14773 -0.44318,0.14773c-0.14773,0 -0.32103,-0.02176 -0.44318,0.14773c-0.19315,0.26798 -0.26942,0.36729 -0.59091,0.44318c-0.14377,0.03394 -0.29545,0.14773 -0.44318,0.14773c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.29545,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.44318,0c-0.14773,0 -0.14773,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.44318,0c0,0 -0.14773,0 -0.29545,0c-0.14773,0 -0.29545,0 -0.29545,-0.14773l0,-0.14773'),
    path2D: new Path2D('m-6.18732,10.67871c0.465,0.53389 0.68615,0.42213 0.78824,2.44423l0.08878,6.42631c0.00582,0.09092 0.00201,0.75648 0.40118,1.54316c0.36142,0.79593 1.3994,1.68591 2.85156,1.6252c2.14183,-0.02639 2.14031,-0.02198 4.28148,-0.05724c1.4507,0.01906 2.47029,-0.89291 2.80709,-1.70098c0.38177,-0.7988 0.35898,-1.46239 0.35981,-1.55473l-0.08215,-6.42404c0.05079,-2.01776 0.26852,-1.91458 0.72337,-2.4623c0.60245,-0.5316 1.44144,-1.73035 1.33262,-3.98817c-0.0572,-4.28517 -0.0572,-4.28517 -0.0572,-4.28517l-0.01542,-1.06983l-2.13741,0.02791l-0.1878,-13.92314c-0.0366,-1.5044 -0.79516,-2.25148 -1.22743,-3.13597c-0.4696,-0.92324 -0.98019,-2.29526 -1.02815,-5.39912l-0.01542,-1.06983l-6.42407,0.08584l0.0147,1.06834c0.03316,3.10742 -0.43665,4.48976 -0.88172,5.42614c-0.40633,0.89905 -1.14682,1.66358 -1.14422,3.16988l0.18417,13.91572l-2.1411,0.02787l0.01315,1.07646c0,0 0,0 0.06093,4.28152c-0.04709,2.26232 0.81624,3.43069 1.43501,3.95193zm2.58899,-23.28507c-0.02452,-0.63701 0.29451,-0.95104 0.92644,-2.20855c0.53137,-1.08334 1.02579,-2.65606 1.09569,-5.3156l2.1751,-0.02979c0.14145,2.65186 0.68133,4.21548 1.23974,5.28284c0.66322,1.24044 0.99067,1.54554 0.98416,2.18301l0.18634,13.92018l-6.42479,0.08436l-0.18268,-13.91645z'),
    color: "#ff5a31",
    lives: 3,
    safeDeathPeriod: 2000,
    width: 50,
    height: 65,
    missile: {
        path2D: new Path2D('m-0.45772,11.24997c0,0 -9.81268,-23.39996 0.5924,-23.39996c10.40509,0 -0.5924,23.39996 -0.5924,23.39996z'),
        color: '#0085dd',
        speed: 7,
        reloadTime: 550
    }
};

const defaultEnemyConfig = {
    // path2D: new Path2D('m-11.37013,5.53696c-0.35065,0 -0.7013,0 -0.7013,0.35065c0,0 -0.10271,0.1027 -0.35065,0.35065c-0.24794,0.24795 0,0.7013 0,0.7013c-0.35065,0 -0.35065,0.7013 -0.35065,1.05195c0,0.35065 0,0.35065 0,0.7013c0,0.35065 0,1.05195 0,1.05195c0,0.35065 -0.13419,0.72799 0,1.05195c0.18977,0.45815 0.7013,0.35065 0.7013,0.7013c0,0.35065 0.02669,0.56711 0.35065,0.7013c0.45814,0.18977 0.8837,0.46414 1.4026,1.05195c0.83671,0.94781 1.12617,0.60106 2.1039,1.4026c0.76699,0.62878 1.4026,1.05195 1.75325,1.4026c0.35065,0.35065 0.75424,0.1524 1.4026,1.05195c0.20503,0.28446 0,1.05195 0,1.05195c0,0.7013 0,1.05195 0,1.4026c0,0.35065 -0.76652,0.59349 -1.4026,1.05195c-0.40229,0.28995 -0.7013,0.35065 -1.75325,0.35065c-1.05195,0 -1.75325,0 -2.45455,0c-1.05195,0 -1.4026,0 -1.75325,0c-0.7013,0 -1.42929,-0.21646 -1.75325,-0.35065c-0.45814,-0.18977 -0.9067,-0.55605 -1.4026,-1.05195c-0.24794,-0.24795 -0.51153,-0.24315 -0.7013,-0.7013c-0.13419,-0.32396 -1.02306,-1.1876 -1.4026,-2.1039c-0.26838,-0.64792 -0.27696,-1.4301 -0.7013,-2.45455c-0.30006,-0.72439 -0.45336,-1.5053 -0.7013,-1.75325c-0.49589,-0.49589 0,-1.4026 0,-1.75325c0,-0.35065 0.26838,-0.75468 0,-1.4026c-0.18977,-0.45815 -0.35065,-1.05195 -0.35065,-1.05195c0,-0.35065 0,-1.4026 0,-1.4026c0,-0.7013 0.16088,-0.94445 0.35065,-1.4026c0.13419,-0.32396 0,-0.7013 0.35065,-1.05195c0.35065,-0.35065 0.7013,-0.35065 0.7013,-0.7013c0,-0.35065 0.10271,-0.804 0.35065,-1.05195c0.24794,-0.24795 0.86218,0.1075 1.05195,-0.35065c0.13419,-0.32396 0.35065,-0.35065 0.35065,-0.7013c0,-0.35065 0.55605,0.14524 1.05195,-0.35065c0.24794,-0.24795 0.35065,-0.7013 0.7013,-0.7013c0.7013,0 0.94446,-0.16088 1.4026,-0.35065c0.32396,-0.13419 0.80401,0.24795 1.05195,0c0.24794,-0.24795 0,-0.35065 0,-0.7013c0,-0.35065 0,-0.7013 0,-1.05195c0,0 0,-0.35065 0,-1.05195c0,-0.35065 0,-0.35065 0,-0.35065c0,-0.35065 -0.35065,-0.7013 -0.35065,-1.05195c0,-0.35065 -0.24316,-0.51153 -0.7013,-0.7013c-0.32396,-0.13419 -0.72799,0.13419 -1.05195,0c-0.45814,-0.18977 -0.45336,-0.45335 -0.7013,-0.7013c-0.49589,-0.49589 -1.15466,0.24795 -1.4026,0c-0.24794,-0.24795 0,-0.35065 0,-0.35065c-0.35065,0 -0.7013,0 -1.05195,0c-0.35065,0 -0.80401,-0.45335 -1.05195,-0.7013c-0.24794,-0.24795 -0.35065,-0.35065 -0.7013,-0.35065c-0.7013,0 -0.99015,-0.1705 -1.75325,-0.35065c-0.34126,-0.08056 -1.05195,-0.35065 -1.4026,-0.35065c-0.7013,0 -0.94446,-0.51153 -1.4026,-0.7013c-0.32396,-0.13419 -1.05195,-0.35065 -1.05195,-0.35065c-0.35065,-0.35065 -0.94414,-0.41587 -1.4026,-1.05195c-0.28995,-0.40229 -0.804,-0.804 -1.05195,-1.05195c-0.24795,-0.24795 -0.35065,-0.7013 -0.35065,-0.7013c0,0 0,-0.35065 0,-0.7013c0,-0.7013 0,-0.7013 0,-1.05195c0,-0.35065 0.02669,-0.91776 0.35065,-1.05195c0.91629,-0.37954 0.99015,-1.22245 1.75325,-1.4026c0.68254,-0.16112 1.05195,0 2.1039,0c1.05195,0 2.45455,0 2.80519,0c1.4026,0 2.13058,-0.13419 2.45455,0c0.45814,0.18977 0.89386,1.03623 2.1039,1.4026c0.3356,0.10161 1.05195,0 1.75325,0.35065c0.7013,0.35065 0.6395,0.8718 1.4026,1.05195c0.68254,0.16112 0.59381,0.51153 1.05195,0.7013c0.32396,0.13419 0.86218,-0.1075 1.05195,0.35065c0.13419,0.32396 0.35065,0.35065 0.7013,0.35065c0.35065,0 0.7013,0 0.7013,0c0,-0.35065 0,-0.7013 0,-1.05195c0,-0.35065 0,-0.35065 0,-0.7013c0,-0.35065 0,-0.7013 0,-1.05195c0,-0.35065 -0.13419,-1.07864 0,-1.4026c0.18977,-0.45815 0.43292,-0.40403 0.7013,-1.05195c0.18977,-0.45815 0.99039,-0.38497 1.4026,-1.05195c0.36869,-0.59656 0.03433,-0.99039 0.7013,-1.4026c0.29828,-0.18435 0.7013,-0.7013 1.4026,-0.7013c0.35065,0 1.05195,-0.35065 1.4026,-0.35065c0.35065,0 0.7013,0 1.05195,0c0.35065,0 0.24316,0.16088 0.7013,0.35065c0.32396,0.13419 0.67241,-0.21499 1.05195,0.7013c0.26838,0.64791 0.16088,0.94445 0.35065,1.4026c0.13419,0.32396 0,0.7013 0,0.7013c0,0.7013 0,1.05195 0,1.4026c0,0 0,0.7013 0,1.4026c0,0.35065 0.10271,0.45335 0.35065,0.7013c0.24794,0.24795 0.35065,0.7013 0.35065,1.05195c0,0.35065 0.35065,0.35065 0.7013,0.35065c0.35065,0 0.7013,0 1.05195,0c0,0 0.35065,0 1.05195,0c0.35065,0 0.35065,0 0.7013,0c0.35065,0 0.7013,0 1.05195,0c0,0 0.35065,-0.7013 0.7013,-0.7013c0,0 0.16088,-0.24315 0.35065,-0.7013c0.13419,-0.32396 0.35065,-0.7013 0.35065,-1.05195c0,-0.7013 0,-1.05195 0,-1.05195c0,-0.35065 0,-1.4026 0,-1.4026c0,-0.35065 0.06522,-0.94414 0.7013,-1.4026c0.80457,-0.57991 1.64576,-1.56348 2.1039,-1.75325c0.32396,-0.13419 1.05195,0 1.75325,0c0.7013,0 1.3408,0.17051 2.1039,0.35065c0.68254,0.16112 1.05195,0.35065 1.75325,0.7013c0,0 0.38498,0.28909 1.05195,0.7013c0.29828,0.18435 0.35065,0.35065 0.35065,0.7013c0,0.35065 0,0.7013 0,0.7013c0,0.35065 0,0.7013 0,1.05195c0,0.35065 0.26838,0.75468 0,1.4026c-0.18977,0.45815 -0.35065,0.35065 -0.35065,0.7013c0,0.35065 -0.10271,0.45335 -0.35065,0.7013c-0.24794,0.24795 0,0.7013 0,1.05195c0,0.35065 0,0.7013 0,0.7013c0,0.35065 0,1.4026 0,1.4026c0,0.35065 0.45336,0.1027 0.7013,0.35065c0.24794,0.24795 0.00453,0.40682 0.35065,0.35065c1.09453,-0.17762 1.10432,-0.51695 1.4026,-0.7013c0.66697,-0.41221 0.59381,-1.21283 1.05195,-1.4026c0.32396,-0.13419 0.38498,-0.99039 1.05195,-1.4026c0.29828,-0.18435 0.35065,-0.35065 0.7013,-0.7013c0.35065,-0.35065 0.7013,-0.7013 1.05195,-0.7013c0,0 -0.10749,-0.86218 0.35065,-1.05195c0.32396,-0.13419 0.7013,-0.35065 1.05195,-0.35065c0,0 0.35065,0 0.7013,0c0.35065,0 0.45336,-0.24795 0.7013,0c0.24794,0.24795 0,0.7013 0,1.05195c0,0.35065 -0.24794,0.45335 0,0.7013c0.24794,0.24795 0.45336,0.1027 0.7013,0.35065c0.24794,0.24795 0.7013,0.35065 0.7013,0.35065c0.35065,0.35065 0.7013,0.7013 0.7013,1.05195c0,0.35065 -0.10271,0.45335 -0.35065,0.7013c-0.24794,0.24795 0,0.7013 0,1.05195c0,0.35065 -0.35065,0.35065 -0.35065,0.7013c0,0 -0.10271,0.45335 -0.35065,0.7013c-0.24794,0.24795 -0.7013,0.35065 -1.05195,0.35065c-0.35065,0 -0.02816,0.83329 -1.4026,1.4026c-0.32396,0.13419 -0.10271,0.1027 -0.35065,0.35065c-0.24794,0.24795 -0.80401,0.1027 -1.05195,0.35065c-0.24794,0.24795 -0.41587,0.24284 -1.05195,0.7013c-0.40229,0.28995 -0.35065,0.7013 -0.35065,0.7013c-0.35065,0 -0.7013,0.7013 -1.4026,0.7013c0,0 -0.35065,0.35065 -0.7013,0.7013c-0.35065,0.35065 -0.71068,0.62074 -1.05195,0.7013c-0.7631,0.18015 -1.05195,0.7013 -1.05195,0.7013c-0.7013,0.35065 -1.4026,0.7013 -1.4026,0.7013c-0.35065,0.35065 -0.9067,0.20541 -1.4026,0.7013c-0.24794,0.24795 -0.59381,0.51153 -1.05195,0.7013c-0.32396,0.13419 -0.7013,0 -1.4026,0c-0.35065,0 -0.35065,0 -0.7013,0c-0.35065,0 -0.7013,0 -0.7013,0.7013c0,0.35065 0,0.7013 0,0.7013c0,0.35065 0,0.7013 0,1.05195c0,0.35065 0,0.7013 0,1.4026c0,0.35065 0,0.35065 0,0.7013c0,0.35065 0,0.7013 0,1.05195c0,0 -0.24794,0.45335 0,0.7013c0.24794,0.24795 0.10271,0.45335 0.35065,0.7013c0.24794,0.24795 0.45336,-0.24795 0.7013,0c0.24794,0.24795 0,0.35065 0.7013,0.35065c0.35065,0 0.45336,0.1027 0.7013,0.35065c0.24794,0.24795 0.35065,0.35065 0.7013,0.7013c0.35065,0.35065 0.72799,0.21646 1.05195,0.35065c0.91629,0.37954 1.90012,0.84817 2.45455,1.4026c0.55443,0.55443 1.4026,1.05195 1.75325,1.4026c0.35065,0.35065 0.86218,0.94445 1.05195,1.4026c0.13419,0.32396 0.24316,0.86218 0.7013,1.05195c0.32396,0.13419 0.7013,1.05195 0.7013,1.4026c0,0.35065 0,0.7013 0,1.4026c0,0.35065 0.24794,1.15465 0,1.4026c-0.24794,0.24795 -0.37734,-0.13419 -0.7013,0c-0.91629,0.37954 -0.9067,0.55605 -1.4026,1.05195c-0.24794,0.24795 -0.72006,0.54017 -1.4026,0.7013c-0.7631,0.18015 -0.7013,0.35065 -1.4026,0.7013c-0.7013,0.35065 -0.72006,0.18952 -1.4026,0.35065c-0.7631,0.18015 -1.4026,0.35065 -1.75325,0.35065c-0.35065,0 -0.35065,0 -1.4026,0c-0.35065,0 -0.7013,0 -1.4026,0c-0.35065,0 -0.7013,0 -1.05195,0c-0.35065,0 -0.72006,-0.18952 -1.4026,-0.35065c-0.7631,-0.18015 -0.7013,-0.7013 -0.7013,-0.7013c-0.35065,-0.35065 -0.7013,-0.7013 -0.7013,-1.05195c0,-0.7013 0,-1.05195 0,-1.05195c0,-0.35065 -0.24794,-0.804 0,-1.05195c0.24794,-0.24795 0.35065,-0.35065 0.7013,-0.35065c0,0 0.35065,0 0.7013,0c0.35065,0 0.7013,0 1.05195,0c0.35065,0 0.7013,0 1.05195,0c0,0 0.45336,0.24795 0.7013,0c0.24794,-0.24795 0,-0.7013 0,-1.05195c0,-0.35065 0,-0.35065 0,-1.05195c0,-0.35065 0,-0.7013 0,-0.7013c-0.35065,-0.35065 -0.7013,-0.7013 -0.7013,-1.05195c0,-0.35065 -0.16088,-0.24315 -0.35065,-0.7013c-0.13419,-0.32396 -0.10271,-0.804 -0.35065,-1.05195c-0.24794,-0.24795 -0.7013,0 -0.7013,0c0,-0.7013 -0.7013,-0.7013 -1.05195,-0.7013c-0.35065,0 -0.35065,-0.35065 -0.35065,-0.35065c0,-0.35065 -0.35065,-0.35065 -0.7013,-0.35065c0,0 0,-0.35065 -0.7013,-0.7013c0,0 -0.10271,-0.45335 -0.35065,-0.7013c-0.24794,-0.24795 -0.21646,-0.37734 -0.35065,-0.7013c-0.18977,-0.45815 -0.7013,-0.7013 -0.7013,-0.7013c-0.35065,0 -0.59381,-0.16088 -1.05195,-0.35065c-0.32396,-0.13419 -0.35065,0 -0.7013,0c-0.35065,0 -0.35065,0.35065 -0.7013,0.35065c0,0 -0.35065,0 -0.35065,0.35065c0,0 -0.35065,0 -0.7013,0c-0.35065,0 -0.7013,0 -0.7013,0c-0.35065,0 -0.35065,0.35065 -0.7013,0.35065c-0.35065,0 -0.80401,0.24795 -1.05195,0c-0.24794,-0.24795 0,-0.7013 0,-0.7013c0,-0.35065 0,-1.05195 0,-1.4026c0,0 -0.13419,-0.37734 0,-0.7013c0.18977,-0.45815 0.45336,-0.45335 0.7013,-0.7013c0.24794,-0.24795 -0.24794,-0.804 0,-1.05195c0.24794,-0.24795 0.45336,-0.1027 0.7013,-0.35065c0.49589,-0.49589 0.10271,-0.804 0.35065,-1.05195c0.24794,-0.24795 -0.24794,-0.45335 0,-0.7013c0.24794,-0.24795 0.35065,-0.7013 0.35065,-1.05195c0,0 0,-0.35065 0,-0.7013c0,-0.35065 -0.10271,-0.45335 -0.35065,-0.7013c-0.49589,-0.49589 0.10749,-0.86218 -0.35065,-1.05195c-0.32396,-0.13419 -0.35065,-0.35065 -1.05195,-0.35065c-0.35065,0 -0.7013,0 -1.05195,0c-0.35065,0 -0.37734,-0.13419 -0.7013,0c-0.45814,0.18977 -0.7013,0.35065 -1.05195,1.4026c0,0 -0.35065,0.35065 -0.35065,0.7013c0,0.35065 0,0.7013 0,0.7013c0,0.35065 0,0.7013 0,1.05195c0,0.35065 0,0.35065 0,0.7013c0,0.35065 0,0.7013 0,1.05195c0,0 0,0.35065 0,0.7013c0,0.35065 0,0.7013 0,1.4026c0,0.35065 0,0.7013 0,0.7013c0,1.05195 0,1.4026 -0.35065,1.4026c0,0 -0.35065,0 -0.7013,0c0,0 -0.35065,0 -0.7013,0c-0.35065,0 -0.7013,0 -0.7013,0c-0.35065,0 -1.05195,0 -1.05195,0c-0.35065,0 -0.35065,0 -1.05195,0c-0.35065,0 -0.7013,0 -0.7013,0c-0.35065,0 -0.10271,-0.45335 -0.35065,-0.7013c-0.24794,-0.24795 -0.35065,-0.35065 -0.35065,-0.7013c0,0 -0.35065,0 -0.7013,0l0,0l-0.35065,0'),

    // path2D: new Path2D('M469.344,266.664v-85.328h-42.656v-42.672H384v-21.328h42.688v-64h-64v42.656H320v42.672H192V95.992h-42.656V53.336h-64v64H128v21.328H85.344v42.672H42.688v85.328H0v149.328h64v-85.328h21.344v85.328H128v42.672h106.688v-64h-85.344v-21.328h213.344v21.328h-85.344v64H384v-42.672h42.688v-85.328H448v85.328h64V266.664H469.344z M192,245.336h-64v-64h64V245.336zM384,245.336h-64v-64h64V245.336z'),
    // path2D: new Path2D('m23.08456,-0.08128l0,-9.83272l-4.91544,0l0,-4.91728l-4.91913,0l0,-2.45772l4.91913,0l0,-7.375l-7.375,0l0,4.91544l-4.91913,0l0,4.91728l-14.75,0l0,-4.91728l-4.91544,0l0,-4.91544l-7.375,0l0,7.375l4.91544,0l0,2.45772l-4.91544,0l0,4.91728l-4.91544,0l0,9.83272l-4.91913,0l0,17.20772l7.375,0l0,-9.83272l2.45956,0l0,9.83272l4.91544,0l0,4.91728l12.29412,0l0,-7.375l-9.83456,0l0,-2.45772l24.58456,0l0,2.45772l-9.83456,0l0,7.375l12.29044,0l0,-4.91728l4.91913,0l0,-9.83272l2.45587,0l0,9.83272l7.375,0l0,-17.20772l-4.91544,0zm-31.95956,-2.45772l-7.375,0l0,-7.375l7.375,0l0,7.375zm22.125,0l-7.375,0l0,-7.375l7.375,0l0,7.375z'),
    path2D: new Path2D('m-23.26153,-11.68226c0.30912,-0.0618 2.55435,2.45923 2.5967,2.96723c0.06182,0.7418 1.48383,0.7418 1.85478,0.7418c0.37097,0 3.02949,1.60725 4.82245,3.33814c1.79298,1.73088 7.04821,0.12363 7.41915,0c0.37097,-0.12365 17.31138,-3.39995 21.88651,-1.11271c2.19731,1.09849 6.52842,-2.78247 7.09458,-10.84893c-0.23185,-5.37808 -5.06898,-5.57992 -6.07444,-3.94084c-0.74192,0.72635 -2.00936,0.50999 -1.70021,-0.81907c0.2811,-0.89 2.16391,-3.63176 5.64165,-2.42632c2.94829,1.02192 4.65358,3.47986 5.28615,7.09351c0.41732,7.78897 -5.42527,13.53796 -5.42527,13.53796c0,0 0.4637,2.03998 1.11289,3.33814c0.64917,1.29816 0.83464,5.74899 0.7419,6.30534c-0.09273,0.55636 2.7822,3.61632 3.70959,3.70903c0.80374,0.37091 3.06042,7.23263 3.15314,8.71623c0.83466,0.41726 -0.09273,2.5036 -1.11287,2.78178c-1.02014,0.27818 -1.29836,-1.66907 -1.29836,-2.59632c0,-0.92725 -1.02014,-5.28538 -3.89506,-5.74899c-2.87492,-0.46364 -5.37888,-2.03998 -5.37888,-2.03998c0,0 -0.18549,0.92727 -0.55644,1.29818c0,0 0.92739,1.57632 0.92739,3.89447c-0.09273,1.01998 -1.57656,4.17267 -2.5967,4.45085c0,0 -1.66931,2.59632 -2.41123,2.59632c-0.74192,0 -2.04028,0.92725 -4.08054,-0.18545c0,0 0.37095,-2.31814 2.22575,-1.66907c0,0 4.35876,-3.33812 2.22573,-4.82174c0,0 -1.29834,-1.85451 -2.04026,-2.59632c-0.74192,-0.7418 -1.48383,-1.94723 -1.66931,-3.33812c0,0 -6.21354,-0.37091 -7.79012,-0.74182c-1.57656,-0.37089 -4.45148,0.55636 -4.45148,1.11271c0,0.55636 0.4637,5.84174 1.29834,6.86172c0,0 0.27822,1.29816 0,1.66907c-0.27822,0.37089 1.02014,3.43085 -1.48383,3.15267c-2.36485,0.41726 -3.52409,-1.43724 -0.7419,-2.03996c0.1391,-1.99361 -3.52411,-10.43165 -5.93534,-9.27259c-3.15314,0.46364 -2.08663,-2.27177 -5.1934,2.03998c-3.24589,3.80174 -8.81026,6.49079 -9.08846,8.15986c0,0 -1.66931,-0.37091 -2.04028,0.92725c0,0 -4.35876,0.55636 -4.08054,-0.18545c0.27822,-0.7418 0.51007,-2.27177 2.22575,-1.66905c0,0 3.89506,-1.52999 7.60463,-9.45804c0,0 -0.4637,-2.03996 0.18547,-3.70903c0.64919,-1.66905 -0.37095,-8.53077 -5.00793,-8.15986c0,0 -1.73113,0.61817 -2.78218,-2.22541c0,0 -0.43279,-0.55636 0,-1.11271c0.43277,-0.55636 1.48383,-1.42179 1.66931,-2.03996c0.18547,-0.61819 0.61827,-1.54544 2.96765,-2.41089c1.11289,-1.15906 -0.12363,-3.46175 0.18549,-3.52358z'),
    path2DRight: new Path2D('m22.49883,-10.68226c-0.31428,-0.0618 -2.59693,2.45923 -2.63998,2.96723c-0.06286,0.7418 -1.50856,0.7418 -1.8857,0.7418c-0.37715,0 -3.07999,1.60725 -4.90283,3.33814c-1.82286,1.73088 -7.16567,0.12363 -7.5428,0c-0.37715,-0.12365 -17.5999,-3.39995 -22.25128,-1.11271c-2.23393,1.09849 -6.63722,-2.78247 -7.21282,-10.84893c0.23571,-5.37808 5.15346,-5.57992 6.17568,-3.94084c0.75428,0.72635 2.04284,0.50999 1.72855,-0.81907c-0.28578,-0.89 -2.19997,-3.63176 -5.73567,-2.42632c-2.99743,1.02192 -4.73114,3.47986 -5.37425,7.09351c-0.42428,7.78897 5.51569,13.53796 5.51569,13.53796c0,0 -0.47142,2.03998 -1.13143,3.33814c-0.65999,1.29816 -0.84856,5.74899 -0.75426,6.30534c0.09427,0.55636 -2.82856,3.61632 -3.77141,3.70903c-0.81714,0.37091 -3.11142,7.23263 -3.2057,8.71623c-0.84858,0.41726 0.09427,2.5036 1.13141,2.78178c1.03714,0.27818 1.32,-1.66907 1.32,-2.59632c0,-0.92725 1.03714,-5.28538 3.95998,-5.74899c2.92284,-0.46364 5.46852,-2.03998 5.46852,-2.03998c0,0 0.18859,0.92727 0.56572,1.29818c0,0 -0.94285,1.57632 -0.94285,3.89447c0.09427,1.01998 1.60284,4.17267 2.63998,4.45085c0,0 1.69713,2.59632 2.45141,2.59632c0.75428,0 2.07428,0.92725 4.14854,-0.18545c0,0 -0.37713,-2.31814 -2.26285,-1.66907c0,0 -4.4314,-3.33812 -2.26283,-4.82174c0,0 1.31998,-1.85451 2.07426,-2.59632c0.75428,-0.7418 1.50856,-1.94723 1.69713,-3.33812c0,0 6.3171,-0.37091 7.91996,-0.74182c1.60284,-0.37089 4.52567,0.55636 4.52567,1.11271c0,0.55636 -0.47142,5.84174 -1.31998,6.86172c0,0 -0.28286,1.29816 0,1.66907c0.28286,0.37089 -1.03714,3.43085 1.50856,3.15267c2.40427,0.41726 3.58283,-1.43724 0.75426,-2.03996c-0.14142,-1.99361 3.58285,-10.43165 6.03426,-9.27259c3.2057,0.46364 2.12141,-2.27177 5.27996,2.03998c3.29999,3.80174 8.9571,6.49079 9.23994,8.15986c0,0 1.69713,-0.37091 2.07428,0.92725c0,0 4.4314,0.55636 4.14854,-0.18545c-0.28286,-0.7418 -0.51857,-2.27177 -2.26285,-1.66905c0,0 -3.95998,-1.52999 -7.73137,-9.45804c0,0 0.47142,-2.03996 -0.18857,-3.70903c-0.66001,-1.66905 0.37713,-8.53077 5.09139,-8.15986c0,0 1.75999,0.61817 2.82854,-2.22541c0,0 0.44001,-0.55636 0,-1.11271c-0.43999,-0.55636 -1.50856,-1.42179 -1.69713,-2.03996c-0.18857,-0.61819 -0.62857,-1.54544 -3.01711,-2.41089c-1.13143,-1.15906 0.12569,-3.46175 -0.18859,-3.52358z'),
    path2DLeft: new Path2D('m-23.26153,-11.68226c0.30912,-0.0618 2.55435,2.45923 2.5967,2.96723c0.06182,0.7418 1.48383,0.7418 1.85478,0.7418c0.37097,0 3.02949,1.60725 4.82245,3.33814c1.79298,1.73088 7.04821,0.12363 7.41915,0c0.37097,-0.12365 17.31138,-3.39995 21.88651,-1.11271c2.19731,1.09849 6.52842,-2.78247 7.09458,-10.84893c-0.23185,-5.37808 -5.06898,-5.57992 -6.07444,-3.94084c-0.74192,0.72635 -2.00936,0.50999 -1.70021,-0.81907c0.2811,-0.89 2.16391,-3.63176 5.64165,-2.42632c2.94829,1.02192 4.65358,3.47986 5.28615,7.09351c0.41732,7.78897 -5.42527,13.53796 -5.42527,13.53796c0,0 0.4637,2.03998 1.11289,3.33814c0.64917,1.29816 0.83464,5.74899 0.7419,6.30534c-0.09273,0.55636 2.7822,3.61632 3.70959,3.70903c0.80374,0.37091 3.06042,7.23263 3.15314,8.71623c0.83466,0.41726 -0.09273,2.5036 -1.11287,2.78178c-1.02014,0.27818 -1.29836,-1.66907 -1.29836,-2.59632c0,-0.92725 -1.02014,-5.28538 -3.89506,-5.74899c-2.87492,-0.46364 -5.37888,-2.03998 -5.37888,-2.03998c0,0 -0.18549,0.92727 -0.55644,1.29818c0,0 0.92739,1.57632 0.92739,3.89447c-0.09273,1.01998 -1.57656,4.17267 -2.5967,4.45085c0,0 -1.66931,2.59632 -2.41123,2.59632c-0.74192,0 -2.04028,0.92725 -4.08054,-0.18545c0,0 0.37095,-2.31814 2.22575,-1.66907c0,0 4.35876,-3.33812 2.22573,-4.82174c0,0 -1.29834,-1.85451 -2.04026,-2.59632c-0.74192,-0.7418 -1.48383,-1.94723 -1.66931,-3.33812c0,0 -6.21354,-0.37091 -7.79012,-0.74182c-1.57656,-0.37089 -4.45148,0.55636 -4.45148,1.11271c0,0.55636 0.4637,5.84174 1.29834,6.86172c0,0 0.27822,1.29816 0,1.66907c-0.27822,0.37089 1.02014,3.43085 -1.48383,3.15267c-2.36485,0.41726 -3.52409,-1.43724 -0.7419,-2.03996c0.1391,-1.99361 -3.52411,-10.43165 -5.93534,-9.27259c-3.15314,0.46364 -2.08663,-2.27177 -5.1934,2.03998c-3.24589,3.80174 -8.81026,6.49079 -9.08846,8.15986c0,0 -1.66931,-0.37091 -2.04028,0.92725c0,0 -4.35876,0.55636 -4.08054,-0.18545c0.27822,-0.7418 0.51007,-2.27177 2.22575,-1.66905c0,0 3.89506,-1.52999 7.60463,-9.45804c0,0 -0.4637,-2.03996 0.18547,-3.70903c0.64919,-1.66905 -0.37095,-8.53077 -5.00793,-8.15986c0,0 -1.73113,0.61817 -2.78218,-2.22541c0,0 -0.43279,-0.55636 0,-1.11271c0.43277,-0.55636 1.48383,-1.42179 1.66931,-2.03996c0.18547,-0.61819 0.61827,-1.54544 2.96765,-2.41089c1.11289,-1.15906 -0.12363,-3.46175 0.18549,-3.52358z'),

    color: '#ffffff',
    speed: 2,
    reloadTime: 1000,
    width: 50,
    height: 50,
    scoreValue: 100
};

const stages = [
    {
        enemy: defaultEnemyConfig,
        numberOfEnemies: 10
    },
    {
        enemy: {...defaultEnemyConfig, color: '#ff8e03', speed: 3},
        numberOfEnemies: 15
    },
    {
        enemy: {...defaultEnemyConfig, color: '#7c4204', speed: 3},
        numberOfEnemies: 20
    },
    {
        enemy: {...defaultEnemyConfig, color: '#c80000', speed: 4},
        numberOfEnemies: 25
    },
    {
        enemy: {...defaultEnemyConfig, color: '#be8f00', speed: 5},
        numberOfEnemies: 30
    },
    {
        enemy: {...defaultEnemyConfig, color: '#7e7e7e', speed: 5},
        numberOfEnemies: 30
    },
    {
        enemy: {...defaultEnemyConfig, color: '#000000', speed: 5.5},
        numberOfEnemies: 30
    }
]


const config = {
    spaceship: spaceship,
    enemy: defaultEnemyConfig,
    stages: stages
}

export default config;
