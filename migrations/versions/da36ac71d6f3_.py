"""empty message

Revision ID: da36ac71d6f3
Revises: 1b7c186c7468
Create Date: 2021-10-28 18:37:25.174139

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'da36ac71d6f3'
down_revision = '1b7c186c7468'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('award', sa.Column('image_name', sa.String(length=120), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('award', 'image_name')
    # ### end Alembic commands ###
