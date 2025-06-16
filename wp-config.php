<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp_ao5cb' );

/** Database username */
define( 'DB_USER', 'wp_mv8py' );

/** Database password */
define( 'DB_PASSWORD', '8A~G5s$?qZQZ3r5p' );

/** Database hostname */
define( 'DB_HOST', 'localhost:3306' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY', '08*y:4J53y0h%+smH8*(HQ)7(&8D)*P5-16R*N6VlLa46vDW]m4m[*[NB1%#V/S]');
define('SECURE_AUTH_KEY', '30ww8V5v;:Dz;0[SL@OpE-6zl|LG%AVJ)7-@3dKPz-36*W9~AaJ2%4Fvyty[x5v;');
define('LOGGED_IN_KEY', 'Bg6/GjfFwjn7n8#SWfc%ee95%*8oH%vt99~5-/2SG3P]6Fpt5R~F;4yF8pz&8a1M');
define('NONCE_KEY', 'em12W0*ZULF~keTji7]y]Q7P*uW;Bwabac!29]ZZQLq8|#zTG#lDL4E5IsYGYJ0l');
define('AUTH_SALT', 'ejgny0/w21%2;eMFWa;9ISa310[a47)QUX_wRTAR9Ch(Tn63;4;t[OiNo7g[Kq2)');
define('SECURE_AUTH_SALT', 'E[[KB5~hV|0e##e4#pGq)W1[zW(A1xn7wq/)9(_3f9r/dSk~904&519T#n)lmZ|;');
define('LOGGED_IN_SALT', '!~|-p9p-P_;854)OomnP2o|A9Th@POn@J:%ZSC*8v@;(P9dv81XC)@Q2Z)m!4xaT');
define('NONCE_SALT', 'tp]:6/Eu)Q1;a0fr7489S%Okvp;jbX@)&i99f0d64/3)y80;z@9I4M9k/kOyb-mL');


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'k3De6H_';


/* Add any custom values between this line and the "stop editing" line. */

define('WP_ALLOW_MULTISITE', true);
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
